import { DataSourceJsonData } from '@grafana/data';
import { DataQuery } from '@grafana/schema';

/**
 * Query
 */
export interface Query extends DataQuery {
  refId: string;
  jsonData: { apiURL: string }; 
}

/**
 * Data Source Options
 */
export interface DataSourceOptions extends DataSourceJsonData {
  apiURL?: string;
  path?: string; // Add the path property
}

/**
 * Secure JSON Data
 */
export interface SecureJsonData {
  apiKey?: string;
}