import React, { useState } from 'react';
import { ActionIcon, Image, Flex, Group, Switch, Text } from '@mantine/core';
import { IconAdjustments, IconCheck, IconX } from '@tabler/icons-react';

export const ExtensionMenu: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Flex
        maw={400}
        justify="space-between"
        align="center"
        direction="column"
        gap={20}
      >
        <Flex justify="space-between" align="center" direction="row">
          <ActionIcon color="indigo" size="xl">
            <IconAdjustments size="2.125rem" />
          </ActionIcon>
          <Group position="center">
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              color="teal"
              label={checked ? 'On' : 'Off'}
              size="lg"
              thumbIcon={
                checked ? (
                  <IconCheck size="1rem" color={'green'} stroke={3} />
                ) : (
                  <IconX size="1rem" color={'red'} stroke={3} />
                )
              }
            />
          </Group>
        </Flex>
        <Image
          maw={240}
          mx="auto"
          radius="md"
          src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
          alt="Random image"
        />
        <Text fw={500} fz="lg" color={'#101828'}>
          Write smarter, edit faster, read better.
        </Text>
        <Text fw={400} fz="md" ta={'center'} color={'#475467'}>
          Simply select the text, click on the extension icon, choose the
          desired action, and let the magic happen!
        </Text>
        <Text fz="sm" ta={'center'} color={'grey'}>
          Share with us your feedback feedback@wonder.ai
        </Text>
      </Flex>
    </>
  );
};
