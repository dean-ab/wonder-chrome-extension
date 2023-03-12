import React, { useRef, useState } from 'react';
import { Badge, Tabs } from '@mantine/core';
import { EditTab } from './EditTab';
import { ReadTab } from './ReadTab';
import { WriteTab } from './WriteTab';
import * as api from '../../api/query';
import { ResultTab } from './ResultTab';
import { RequestParam } from '../../types/RequestParams';

export type ViewMode = 'prompt' | 'result';

interface IProps {
  selectedText?: string;
  replaceSelection: (text: string) => void;
  isContentEditable: boolean;
  closeWidget: () => void;
}

export const Menu: React.FC<IProps> = ({
  selectedText,
  replaceSelection,
  isContentEditable,
  closeWidget,
}) => {
  const prevParams = useRef({ name: '', params: {} });

  const [activeTab, setActiveTab] = useState<string | null>(
    isContentEditable ? 'edit' : 'read',
  );
  const [viewMode, setViewMode] = useState<ViewMode>('prompt');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onAnotherSuggestion = async () => {
    const { name, params } = prevParams.current; // get previous params
    await onSubmitButtonClick(name, params);
  };

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
    prevParams.current = { name, params };
  };

  const onReplaceSelection = () => {
    if (!result) return;

    replaceSelection(result);
    closeWidget();
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
          <Tabs.Tab value="edit" disabled={!isContentEditable}>
            Edit
          </Tabs.Tab>
          <Tabs.Tab value="read">Read</Tabs.Tab>
          <Tabs.Tab value="write" disabled>
            Write <Badge>Coming soon</Badge>
          </Tabs.Tab>
        </Tabs.List>
        {viewMode === 'prompt' ? (
          <>
            <EditTab onSubmit={onSubmitButtonClick} />
            <ReadTab onSubmit={onSubmitButtonClick} />
            <WriteTab />
          </>
        ) : (
          activeTab && (
            <ResultTab
              isLoading={isLoading}
              activeTab={activeTab}
              resultText={result}
              submitAgain={onAnotherSuggestion}
              replaceText={onReplaceSelection}
              isContentEditable={isContentEditable}
              goBack={() => setViewMode('prompt')}
            />
          )
        )}
      </Tabs>
    </div>
  );
};
