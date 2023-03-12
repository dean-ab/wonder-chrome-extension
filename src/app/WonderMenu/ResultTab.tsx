import React from 'react';
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
import { IconCopy, IconCheck, IconArrowLeft } from '@tabler/icons-react';

interface IProps {
  activeTab: string;
  resultText: string;
  replaceText: () => void;
  isContentEditable: boolean;
  isLoading: boolean;
  submitAgain: () => void;
  goBack: () => void;
}

export const ResultTab: React.FC<IProps> = ({
  activeTab,
  resultText,
  replaceText,
  isContentEditable,
  isLoading,
  submitAgain,
  goBack,
}) => {
  const handleClickBack = () => {
    goBack();
  };

  return (
    <Tabs.Panel value={activeTab}>
      <Flex py="xs" direction={'column'} gap={12} maw={650}>
        {isLoading ? (
          <Flex px="lg" gap={8} justify={'center'} p={60}>
            <Loader />
          </Flex>
        ) : (
          <>
            <Flex px="xs" justify={'space-between'}>
              <Button
                onClick={handleClickBack}
                leftIcon={<IconArrowLeft color="grey" />}
                variant="subtle"
                // color="gray"
                compact
              >
                <Text color="grey">Back</Text>
              </Button>
              {/* <Button
                compact
                leftIcon={<IconBookmark color="grey" />}
                variant="subtle"
                color="white"
              >
                <Text color="grey">Add to shotcuts</Text>
              </Button> */}
              <CopyButton value={resultText} timeout={2000}>
                {({ copied, copy }) => (
                  <Button
                    onClick={copy}
                    compact
                    leftIcon={
                      copied ? (
                        <IconCheck size={16} color="green" />
                      ) : (
                        <IconCopy color="grey" />
                      )
                    }
                    variant="subtle"
                    color="grey"
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
                onClick={submitAgain}
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
