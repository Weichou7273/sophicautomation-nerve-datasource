import React, { ChangeEvent, useEffect, useState } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { DataSourceOptions } from '../../types';

interface Props extends DataSourcePluginOptionsEditorProps<DataSourceOptions> {}

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;
  const [apiData, setApiData] = useState<any>({}); // State to store API response data
  const [apiUrl, setApiUrl] = useState(options.jsonData.apiURL || ''); // State to store API URL

  const onApiUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newApiUrl = event.target.value;
    setApiUrl(newApiUrl);
    const newOptions: DataSourceOptions = {
      ...options.jsonData,
      apiURL: newApiUrl,
    };
    onOptionsChange({ ...options, jsonData: newOptions });

    // Clear apiData when the API URL is cleared
    if (!newApiUrl) {
      setApiData({});
    }
  };

  useEffect(() => {
    // Fetch data when API URL is not blank
    const fetchData = async () => {
      try {
        if (apiUrl) {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setApiData(data);
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="gf-form-group">
      <InlineField label="API URL" labelWidth={12}>
        <Input
          onChange={onApiUrlChange}
          value={apiUrl}
          placeholder="Enter API URL"
          width={40}
        />
      </InlineField>
      {/* Display API data */}
      <div>
        <h4>API Data:</h4>
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      </div>
    </div>
  );
}
