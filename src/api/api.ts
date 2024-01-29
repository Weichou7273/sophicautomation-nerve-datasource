import { DataFrame, DataSourceInstanceSettings, FieldType, MutableDataFrame, TimeRange } from '@grafana/data';
import { DataSourceOptions, Query } from '../types';

/**
 * Api class for handling data fetching and transformation
 */
export class Api {
  /**
   * Constructor for Api class
   * @param instanceSettings - Grafana data source instance settings
   */
  constructor(public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {}

  /**
   * Get data from the API and transform it into a DataFrame
   * @param query - Query object
   * @param range - Time range for the query
   * @param jsonData - Data fetched from the API
   * @returns DataFrame representing the data
   */
  getData(query: Query, range: TimeRange, jsonData: any): DataFrame {
    // Transform JSON data into DataFrame fields
    const fields = Object.keys(jsonData[0]).map((key) => {
      return { name: key, values: jsonData.map((item: any) => item[key]), type: FieldType.string };
    });

    // Create a MutableDataFrame with the transformed fields
    return new MutableDataFrame({
      refId: query.refId,
      fields: fields,
    });
  }
}
