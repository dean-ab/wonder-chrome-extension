import React from 'react';
import { Text, Tabs, Flex, Button, Loader, Alert } from '@mantine/core';
import { IconChevronLeft, IconAlertCircle } from '@tabler/icons-react';

interface IProps {
  activeTab: string;
  isLoading: boolean;
  submitAgain: () => void;
  goBack: () => void;
}

export const ErrorPage: React.FC<IProps> = ({
  activeTab,
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
                leftIcon={<IconChevronLeft size={22} color="grey" />}
                variant="subtle"
                sx={{
                  ':hover': { backgroundColor: 'rgb(243 244 245)' },
                }}
                compact
                color="grey"
              >
                <Text weight={400} color="grey">
                  Back
                </Text>
              </Button>
            </Flex>
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Something went wrong"
              color="red"
            >
              Please try another suggestion or try again from scratch.
            </Alert>
            <Flex px="xs" justify={'flex-end'} gap={8}>
              <Button
                size="xs"
                onClick={submitAgain}
                color={'white'}
                variant="outline"
              >
                Try again
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Tabs.Panel>
  );
};
