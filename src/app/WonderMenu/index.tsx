import React, { useRef, useState } from 'react';
import { Alert, Badge, Tabs } from '@mantine/core';
import { EditTab } from './EditTab';
import { ReadTab } from './ReadTab';
import { WriteTab } from './WriteTab';
import * as api from '../../api/query';
import { ResultTab } from './ResultTab';
import { RequestParam } from '../../types/RequestParams';

export type ViewMode = 'prompt' | 'result' | 'error';

import { createStyles } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { ErrorPage } from './ErrorPage';

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
    await onSubmitButtonClick(name, params, true);
  };

  const onSubmitButtonClick = async (
    name: string,
    params: RequestParam,
    isAnotherSuggesion?: boolean,
  ) => {
    if (!selectedText) return;
    setViewMode('result');
    setIsLoading(true);

    try {
      const resultText = await api.query(
        selectedText,
        activeTab as string,
        name,
        params,
        isAnotherSuggesion,
      );
      setResult(resultText);
    } catch (error) {
      console.error(error);
      setViewMode('error');
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
      <Tabs
        value={activeTab}
        onTabChange={onTabChange}
        color="indigo"
        styles={(theme) => ({
          tab: {
            width: 80,
            margin: '0px 40px',
            padding: '10px 0px',
            '&[data-active]': {
              borderColor: `#553AF6`,
              '& > *': {
                color: `#553AF6`,
              },
            },
          },
          tabLabel: {
            color: 'grey',
          },
        })}
      >
        <Tabs.List grow defaultValue="edit" color={'brand'}>
          <Tabs.Tab value="edit" disabled={!isContentEditable}>
            Edit
          </Tabs.Tab>
          <Tabs.Tab value="read">Read</Tabs.Tab>
          <Tabs.Tab value="write" disabled>
            Write{' '}
            <Badge size={'xs'} sx={{ textTransform: 'capitalize' }}>
              Coming soon
            </Badge>
          </Tabs.Tab>
        </Tabs.List>
        {viewMode === 'prompt' ? (
          <>
            <EditTab onSubmit={onSubmitButtonClick} />
            <ReadTab onSubmit={onSubmitButtonClick} />
            <WriteTab />
          </>
        ) : viewMode === 'error' ? (
          <>
            <ErrorPage
              activeTab={activeTab as string}
              isLoading={isLoading}
              submitAgain={onAnotherSuggestion}
              goBack={() => setViewMode('prompt')}
            />
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
