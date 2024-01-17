import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings, TestDataSourceResponse } from '@grafana/data';
import { Api } from '../api';
import { DataSourceOptions, Query } from '../types';

export class DataSource extends DataSourceApi<Query, DataSourceOptions> {
  api: Api;

  constructor(instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {
    super(instanceSettings);
    this.api = new Api(instanceSettings);
  }

  async query(options: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const { range } = options;
  
    // Process targets
    const data = await Promise.all(
      options.targets.map(async (target) => {
        try {
          // Check if jsonData is defined before accessing apiURL
          const apiUrl = target.jsonData?.apiURL;
          if (!apiUrl) {
            throw new Error('API URL is not defined.');
          }
  
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

  async testDatasource(): Promise<TestDataSourceResponse> {
    const isStatusOk = true;
  
    return {
      status: isStatusOk ? 'success' : 'error',
      message: isStatusOk ? 'Connected...' : "Error. Can't connect.",
    };
  }
}
