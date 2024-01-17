import { DataSourcePlugin } from '@grafana/data';
import { ConfigEditor, QueryEditor } from './components';
import { DataSource } from './datasource';
import { DataSourceOptions, Query } from './types';

/**
 * Data Source Plugin
 */
export const plugin = new DataSourcePlugin<DataSource, Query, DataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
