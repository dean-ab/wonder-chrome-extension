import React, { useEffect } from 'react';
import {
  Text,
  Tabs,
  Flex,
  Button,
  Container,
  Loader,
  ActionIcon,
  CopyButton,
} from '@mantine/core';
import { IconCopy, IconBookmark, IconCheck } from '@tabler/icons-react';
import { Events, useAnalytics } from '../../analytics';

interface IProps {
  activeTab: string;
  resultText: string;
  replaceText: () => void;
  isContentEditable: boolean;
  isLoading: boolean;
}

export const ResultTab: React.FC<IProps> = ({
  activeTab,
  resultText,
  replaceText,
  isContentEditable,
  isLoading,
}) => {
  const analytics = useAnalytics();


  const onMount = () => {
    analytics.track(Events.SuggestionScreenDisplayed, { suggested_text: resultText });
  }

  const onCopy = (copyAction: () => void) => {
    analytics.track(Events.CopyButtonClicked);
    copyAction();
  }

  useEffect(onMount, []);

  return (
    <Tabs.Panel value={activeTab}>
      <Flex py="xs" direction={'column'} gap={12} maw={650}>
        {isLoading ? (
          <Flex px="lg" gap={8} justify={'center'} p={60}>
            <Loader />
          </Flex>
        ) : (
          <>
            <Flex px="xs" justify={'flex-end'}>
              <Button
                compact
                leftIcon={<IconBookmark color="grey" />}
                variant="subtle"
                color="white"
              >
                <Text color="grey">Add to shotcuts</Text>
              </Button>
              <CopyButton value={resultText} timeout={2000}>
                {({ copied, copy }) => (
                  <Button
                    onClick={() => onCopy(copy)}
                    compact
                    leftIcon={
                      copied ? (
                        <IconCheck size={16} color="green" />
                      ) : (
                        <IconCopy color="grey" />
                      )
                    }
                    variant="subtle"
                    color="white"
                  >
                    <Text color="grey">Copy</Text>
                  </Button>
                )}
              </CopyButton>
            </Flex>
            <Text p="sm" color="#101828" bg="#f3f1ff" size={14} fw={400}>
              {resultText}
            </Text>
            <Flex px="xs" justify={'flex-end'} gap={8}>
              <Button
                size="xs"
                onClick={replaceText}
                color={'white'}
                variant="outline"
              >
                Another suggestion
              </Button>
              {isContentEditable && (
                <Button size="xs" onClick={replaceText} bg={'#553AF6'}>
                  Replace text
                </Button>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </Tabs.Panel>
  );
};
