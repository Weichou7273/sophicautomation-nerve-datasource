import React, { ChangeEvent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { TestIds } from '../../constants';
import { DataSource } from '../../datasource';
import { DataSourceOptions, Query } from '../../types';

/**
 * Editor Properties
 */
type Props = QueryEditorProps<DataSource, Query, DataSourceOptions>;

/**
 * Query Editor
 */
export const QueryEditor: React.FC<Props> = ({ onChange, query }) => {
  /**
   * Query Text change
   */
  const onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, queryText: event.target.value });
  };

  /**
   * Render
   */
  return (
    <InlineFieldRow>
      <InlineField label="Query Text" labelWidth={14} grow>
        <Input
          type="text"
          value={query.queryText}
          onChange={onQueryTextChange}
          data-testid={TestIds.queryEditor.fieldQueryText}
          // Use defaultValue to initialize the input field
          defaultValue={query.queryText}
        />
      </InlineField>
    </InlineFieldRow>
  );
};
