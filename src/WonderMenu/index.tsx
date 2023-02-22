import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import { EditTab } from './EditTab';
import { ReadTab } from './ReadTab';
import { WriteTab } from './WriteTab';
import * as api from '../Api';
import { ResultTab } from './ResultTab';

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

  const onSubmitButtonClick = async () => {
    if (!selectedText) return;

    try {
      const resultText = await api.generateTextFromPrompt(selectedText);
      setViewMode('result');
      setResult(resultText);
    } catch (error) {
      console.error(error);
    }
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
