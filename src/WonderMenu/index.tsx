import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import { EditTab } from './EditTab';
import { ReadTab } from './ReadTab';
import { WriteTab } from './WriteTab';
import * as api from '../api/query';
import { ResultTab } from './ResultTab';
import { RequestParam } from '../types/RequestParams';

export type ViewMode = 'prompt' | 'result';

interface IProps {
  selectedText?: string;
  replaceSelection: (text: string) => void;
  isContentEditable: boolean;
}

export const Menu: React.FC<IProps> = ({
  selectedText,
  replaceSelection,
  isContentEditable,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>('edit');
  const [viewMode, setViewMode] = useState<ViewMode>('prompt');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitButtonClick = async (name: string, params: RequestParam) => {
    if (!selectedText) return;
    setViewMode('result');
    setIsLoading(true);

    try {
      const resultText = await api.query(
        selectedText,
        activeTab as string,
        name,
        params,
      );
      setResult(resultText);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const onReplaceSelection = () => {
    if (!result) return;

    replaceSelection(result);
  };

  const onTabChange = (tabValue: string | null) => {
    if (!tabValue) return;

    setActiveTab(tabValue);
    setViewMode('prompt');
  };

  return (
    <div>
      <Tabs value={activeTab} onTabChange={onTabChange} color="indigo">
        <Tabs.List grow defaultValue="edit">
          <Tabs.Tab value="edit">Edit</Tabs.Tab>
          <Tabs.Tab value="read">Read</Tabs.Tab>
          <Tabs.Tab value="write" disabled>
            Write (Coming soon)
          </Tabs.Tab>
        </Tabs.List>
        {viewMode === 'prompt' ? (
          <>
            <EditTab onSubmit={onSubmitButtonClick} />
            <ReadTab onSubmit={onSubmitButtonClick} />
            <WriteTab onSubmit={onSubmitButtonClick} />
          </>
        ) : (
          activeTab && (
            <ResultTab
              isLoading={isLoading}
              activeTab={activeTab}
              resultText={result}
              replaceText={onReplaceSelection}
              isContentEditable={isContentEditable}
            />
          )
        )}
      </Tabs>
    </div>
  );
};
