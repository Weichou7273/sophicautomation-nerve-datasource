import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings } from '@grafana/data';
import { Api } from '../api';
import { DataSourceOptions, Query } from '../types';

/**
 * Custom DataSource class for handling queries and testing the connection.
 * Extends the DataSourceApi provided by Grafana.
 */
export class DataSource extends DataSourceApi<Query, DataSourceOptions> {
  api: Api;
  instanceSettings: any;
  apiUrl: string; // Add this property to store the API URL

  /**
   * Constructor for the DataSource class.
   *
   * @param instanceSettings - Grafana instance settings for the data source.
   */
  constructor(instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {
    super(instanceSettings);
    this.api = new Api(instanceSettings);
    this.apiUrl = instanceSettings.jsonData?.apiURL || ''; // Initialize with the default API URL
  }

  /**
   * Handles data queries from panels.
   * Fetches data from the specified API URL for each target.
   *
   * @param options - Data query options containing information about the query and time range.
   * @returns Promise<DataQueryResponse> - A promise that resolves to the data for the specified targets.
   */
  async query(options: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const { range, targets } = options;
    console.log('Received query with options:', options);

    const data = await Promise.all(
      targets.map(async (target) => {
        try {
          // Get the API URL from the target or use the default API URL from the data source settings
          const apiUrl = target.jsonData?.apiURL || this.apiUrl;

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

  /**
   * Tests the connection to the data source.
   *
   * @returns Promise<any> - A promise that resolves to the test results.
   */
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
