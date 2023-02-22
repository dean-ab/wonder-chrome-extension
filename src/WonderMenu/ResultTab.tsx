import React from 'react';
import { Text, Tabs, Flex, Button, Container } from '@mantine/core';

interface IProps {
  activeTab: string;
  resultText: string;
  replaceText: () => void;
  isContentEditable: boolean;
}

export const ResultTab: React.FC<IProps> = ({
  activeTab,
  resultText,
  replaceText,
  isContentEditable,
}) => {
  return (
    <Tabs.Panel value={activeTab}>
      <Flex py="xs" direction={'column'} gap={12} maw={650}>
        <Flex px="xs" justify={'flex-end'} gap={8}>
          <Text color="black">Copy</Text>
          <Text color="black">Favorite</Text>
        </Flex>
        <Text p="sm" color="black" bg="#f3f1ff">
          {resultText}
        </Text>
        <Flex px="xs" justify={'flex-end'} gap={8}>
          {isContentEditable && (
            <Button onClick={replaceText} color={'brand'}>
              Replace Text
            </Button>
          )}
        </Flex>
      </Flex>
    </Tabs.Panel>
  );
};
