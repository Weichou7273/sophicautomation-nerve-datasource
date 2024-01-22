import { DataFrame, DataSourceInstanceSettings, FieldType, MutableDataFrame, TimeRange } from '@grafana/data';
import { DataSourceOptions, Query } from '../types';

export class Api {
  constructor(public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {}

  // Modify the getData method to use DataFrame for tabular data
  getData(query: Query, range: TimeRange, jsonData: any): DataFrame {
    const fields = Object.keys(jsonData[0]).map((key) => {
      return { name: key, values: jsonData.map((item: any) => item[key]), type: FieldType.string };
    });

    return new MutableDataFrame({
      refId: query.refId,
      fields: fields,
    });
  }
}
