import React, { useRef, useState } from 'react';
import { Badge, Tabs } from '@mantine/core';
import { EditTab } from './EditTab';
import { ReadTab } from './ReadTab';
import { WriteTab } from './WriteTab';
import * as api from '../../api/query';
import { ResultTab } from './ResultTab';
import { RequestParam } from '../../types/RequestParams';
import { Events, useAnalytics } from '../../analytics';
import { ErrorPage } from './ErrorPage';
import useLimiter from '../hooks/useLimiter';
import { LimitReached } from './LimitReached';

export type ViewMode = 'prompt' | 'result' | 'error';

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
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const analytics = useAnalytics();
  const { submitCount, incrementSubmitCount } = useLimiter();

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
    if (submitCount > 10) {
      setIsOverlayVisible(true);
      return;
    }
    setViewMode('result');
    setIsLoading(true);

    analytics.track(Events.ActionClicked, {
      name,
      params,
      text: selectedText,
      mode: activeTab,
    });

    try {
      const resultText = await api.query(
        selectedText,
        activeTab as string,
        name,
        params,
        isAnotherSuggesion,
      );
      setResult(resultText);
    } catch (error: any) {
      console.error(error);
      analytics.track(Events.ErrorPageDisplayed, { error: error.message });
      setViewMode('error');
    }
    setIsLoading(false);
    prevParams.current = { name, params };
    incrementSubmitCount();
  };

  const onReplaceSelection = () => {
    if (!result) return;

    // TODO: Need to move all params state to this component and add this to the event here.
    analytics.track(Events.ReplaceTextClicked, {
      suggestedText: result,
      originalText: selectedText,
    });
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
        sx={{ backgroundColor: '#F9F9F9' }}
        styles={(theme) => ({
          backgroundColor: 'white',
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
        {isOverlayVisible && <LimitReached />}
      </Tabs>
    </div>
  );
};
