import { DataSourceJsonData } from '@grafana/data';
import { DataQuery } from '@grafana/schema';

/**
 * Query
 * Represents a query for the data source
 */
export interface Query extends DataQuery {
  refId: string;
  jsonData: { apiURL: string }; // JSON data specific to the query, including the API URL
}

/**
 * Data Source Options
 * Represents the options/configuration for the data source
 */
export interface DataSourceOptions extends DataSourceJsonData {
  apiURL?: string; // Optional API URL configuration
  path?: string; // Optional path property
}

/**
 * Secure JSON Data
 * Represents any secure JSON data (e.g., API keys)
 */
export interface SecureJsonData {
  apiKey?: string; // Optional API key configuration
}
