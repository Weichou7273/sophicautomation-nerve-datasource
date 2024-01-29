import React from 'react';
import { QueryEditorProps } from '@grafana/data';
import { InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { TestIds } from '../../constants';
import { DataSource } from '../../datasource';
import { DataSourceOptions, Query } from '../../types';

/**
 * Query Editor Component
 * This component provides the UI for editing the query in the panel editor.
 * It allows the user to input the API URL for the data source.
 *
 * @param onChange - A function to handle changes in the query and update the state.
 * @param query - The current query object containing the JSON data, including the API URL.
 */
type Props = QueryEditorProps<DataSource, Query, DataSourceOptions>;

export const QueryEditor: React.FC<Props> = ({ onChange, query }) => {
  /**
   * Handles the API URL change event.
   * Updates the query state with the new API URL.
   *
   * @param event - The input change event.
   */
  const onApiUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newApiUrl = event.target.value;
    console.log('New API URL:', newApiUrl);
    onChange({ ...query, jsonData: { ...query.jsonData, apiURL: event.target.value } });
  };

  return (
    <InlineFieldRow>
      {/* Display the editable API URL field */}
      <InlineField label="API URL" labelWidth={14} grow>
        <Input
          type="text"
          value={query.jsonData?.apiURL || ''}
          onChange={onApiUrlChange}
          data-testid={TestIds.queryEditor.fieldApiURL}
        />
      </InlineField>
    </InlineFieldRow>
  );
};
