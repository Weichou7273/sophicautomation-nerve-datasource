import React from 'react';
import { QueryEditorProps } from '@grafana/data';
import { InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { TestIds } from '../../constants';
import { DataSource } from '../../datasource';
import { DataSourceOptions, Query } from '../../types';

type Props = QueryEditorProps<DataSource, Query, DataSourceOptions>;

export const QueryEditor: React.FC<Props> = ({ onChange, query }) => {
  const onApiUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
