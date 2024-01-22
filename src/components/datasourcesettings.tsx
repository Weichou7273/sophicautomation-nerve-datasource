import React, { FC } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { DataSourceOptions } from './../types';
import { ConfigEditor } from './ConfigEditor';

interface Props extends DataSourcePluginOptionsEditorProps<DataSourceOptions> {}

export const DataSourceSettings: FC<Props> = ({ options, onOptionsChange }) => {
  return <ConfigEditor options={options} onOptionsChange={onOptionsChange} />;
};
