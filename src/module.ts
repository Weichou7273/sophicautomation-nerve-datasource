import { DataSourcePlugin } from '@grafana/data';
import { ConfigEditor, DataSourceSettings, QueryEditor } from './components'; // Import DataSourceSettings
import { DataSource } from './datasource';
import { DataSourceOptions, Query } from './types';

/**
 * Data Source Plugin
 */
export const plugin = new DataSourcePlugin<DataSource, Query, DataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor)
  .setConfigCtrl(DataSourceSettings); // Use DataSourceSettings
