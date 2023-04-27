import React from 'react';
import { Text, Flex, Button, Overlay, Alert } from '@mantine/core';
import { IconChevronLeft, IconAlertCircle } from '@tabler/icons-react';

interface IProps {}

export const LimitReached: React.FC<IProps> = ({}) => {
  return (
    <Overlay color="white" opacity={0.9}>
      <Flex
        mt={20}
        gap="xl"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        m={60}
      >
        <>
          <Text fw={500} color="black">
            You've hit your daily limit of 10 actions.
          </Text>
          <Text color="black" fz={'sm'} ta={'center'}>
            But dont worry, you can keep using Wonder by simply sharing it with
            your friends 🤗.
          </Text>
          <Flex px="xs" gap={8}>
            <Button
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
            >
              Indigo cyan
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            >
              Lime green
            </Button>
          </Flex>
        </>
      </Flex>
    </Overlay>
  );
};
