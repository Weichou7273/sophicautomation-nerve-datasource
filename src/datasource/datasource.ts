// import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings } from '@grafana/data';
// import { Api } from '../api';
// import { DataSourceOptions, Query } from '../types';

// export class DataSource extends DataSourceApi<Query, DataSourceOptions> {
//   api: Api;

//   constructor(instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {
//     super(instanceSettings);
//     this.api = new Api(instanceSettings);
//   }

//   getApiUrl(target: Query) {
//     const defaultApiUrl = 'http://localhost:3003/'; // Set your default API URL here

//     // Use the API URL from the target query, fallback to the default if not provided
//     return target?.queryText || defaultApiUrl;
//   }
 
//   async query(options: DataQueryRequest<Query>): Promise<DataQueryResponse> {
//     const { range, targets } = options;

//     const data = await Promise.all(
//       targets.map(async (target) => {
//         try {
//           const apiUrl = this.getApiUrl(target);
//           console.log('API URL:', apiUrl);

//           // Add additional logging here
//           console.log('Attempting to fetch data from API...');

//           const response = await fetch(apiUrl);
//           const jsonData = await response.json();

//           return this.api.getData(target, range, jsonData);
//         } catch (error) {
//           console.error('Error fetching data from API:', error);
//           throw error;
//         }
//       })
//     );

//     return { data };
//   }

//   async testDatasource(): Promise<any> {
//     try {
//       // Test connection logic
//       return { status: 'success', message: 'Connected...' };
//     } catch (error) {
//       console.error('Error testing datasource:', error);
//       return { status: 'error', message: `Error: ${(error as Error).message}` };
//     }
//   }
// }
import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings } from '@grafana/data';
import { Api } from '../api';
import { DataSourceOptions, Query } from '../types';

export class DataSource extends DataSourceApi<Query, DataSourceOptions> {
  api: Api;

  constructor(instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {
    super(instanceSettings);
    this.api = new Api(instanceSettings);
  }

  async query(options: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const { range, targets } = options;

    const data = await Promise.all(
      targets.map(async (target) => {
        try {
          // Get the API URL from the target's jsonData
          const apiUrl = target?.jsonData?.apiURL;

          if (!apiUrl) {
            throw new Error('API URL is not defined.');
          }

          console.log('API URL:', apiUrl);

          // Additional logging
          console.log('Attempting to fetch data from API...');

          const response = await fetch(apiUrl);
          const jsonData = await response.json();

          return this.api.getData(target, range, jsonData);
        } catch (error) {
          console.error('Error fetching data from API:', error);
          throw error;
        }
      })
    );

    return { data };
  }

  async testDatasource(): Promise<any> {
    try {
      // Test connection logic
      return { status: 'success', message: 'Connected...' };
    } catch (error) {
      console.error('Error testing datasource:', error);
      return { status: 'error', message: `Error: ${(error as Error).message}` };
    }
  }
}

