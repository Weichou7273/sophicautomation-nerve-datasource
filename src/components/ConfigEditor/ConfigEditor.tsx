import React, { ChangeEvent, useEffect, useState } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { DataSourceOptions } from '../../types';

interface Props extends DataSourcePluginOptionsEditorProps<DataSourceOptions> {}

/**
 * ConfigEditor Component
 *
 * Displays and manages the configuration options for the data source.
 * Allows the user to input the API URL and fetch associated data for preview.
 *
 * @param props - Component properties, including onOptionsChange and options from Grafana.
 */
export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;
  const [apiData, setApiData] = useState<any>({});
  const [apiUrl, setApiUrl] = useState(options.jsonData?.apiURL || '');

  /**
   * Handles changes to the API URL input.
   * Updates the state and triggers onOptionsChange to update the jsonData.apiURL property.
   *
   * @param event - ChangeEvent from the input field.
   */
  const onApiUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newApiUrl = event.target.value;
    setApiUrl(newApiUrl);

    // Reset API data when URL changes
    setApiData({});

    // Update the jsonData.apiURL property in the options
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        apiURL: newApiUrl,
      },
    });
  };

  useEffect(() => {
    let isMounted = true;

    /**
     * Fetches data from the specified API URL when the component mounts or API URL changes.
     * Updates the state with the fetched data for preview.
     */
    const fetchData = async () => {
      try {
        if (apiUrl) {
          const response = await fetch(apiUrl);
          const data = await response.json();

          // Check if the component is still mounted before updating state
          if (isMounted) {
            setApiData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchData();

    // Cleanup function to cancel ongoing fetch operations when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [apiUrl]); //If apiUrl is null or an empty string, the useEffect will not run else  the useEffect will run whenever apiUrl changes.

  return (
    <div className="gf-form-group">
      {/* Display the API URL input field */}
      <InlineField label="API URL" labelWidth={12}>
        <Input onChange={onApiUrlChange} value={apiUrl} placeholder="Enter API URL" width={40} />
      </InlineField>
      <br />
      <div>
        <h4>API Data:</h4>
        {/* Display the fetched API data in a preformatted block */}
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      </div>
    </div>
  );
}
