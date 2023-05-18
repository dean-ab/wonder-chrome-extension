import React from 'react';
import { Text, Flex, Button, Overlay, Alert } from '@mantine/core';
import { ShareLinks } from './ShareLinks/ShareLinks';
import useLimiter from '../hooks/useLimiter';

interface IProps {}

export const LimitReached: React.FC<IProps> = ({}) => {
  const { resetCount } = useLimiter();

  return (
    <Overlay color="white" opacity={0.95}>
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
            <ShareLinks withPromotionText={false} onShare={resetCount} />
          </Flex>
        </>
      </Flex>
    </Overlay>
  );
};
