import React, { useState, useEffect } from 'react';
import {
  ActionIcon,
  Image,
  Flex,
  Group,
  Switch,
  Text,
  Center,
} from '@mantine/core';
import { IconAdjustments, IconCheck, IconX } from '@tabler/icons-react';
import '../../app/index.css';
import { AppIcon } from '../../app/WonderApp/AppShell/AppIcon';

export const WONDER_ACTIVE_STORAGE_KEY = 'wonder-active';

export const ExtensionMenu: React.FC = () => {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    chrome?.storage?.local.get([WONDER_ACTIVE_STORAGE_KEY], (result) => {
      if (result[WONDER_ACTIVE_STORAGE_KEY] === undefined) {
        chrome.storage.local
          .set({ [WONDER_ACTIVE_STORAGE_KEY]: true })
          .then(() => {
            setChecked(true);
          });
      }
      setChecked(result[WONDER_ACTIVE_STORAGE_KEY]);
    });
  }, []);

  const hanldeSwithChange = async (value: boolean) => {
    await chrome.storage.local.set({ [WONDER_ACTIVE_STORAGE_KEY]: value });
    setChecked(value);
  };

  return (
    <>
      <Center maw={400} h={500} mx="auto">
        <Flex
          maw={500}
          justify="space-between"
          align="center"
          direction="column"
          gap={30}
        >
          <Flex
            justify="space-between"
            align="center"
            direction="row"
            gap={120}
          >
            <ActionIcon color="indigo" size="xl">
              <AppIcon size={30} />
            </ActionIcon>
            <Group position="center">
              <Switch
                checked={checked}
                onChange={(event) =>
                  hanldeSwithChange(event.currentTarget.checked)
                }
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
            maw={300}
            mx="auto"
            radius="md"
            src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
            alt="Random image"
          />
          <Text fw={600} fz="lg" color={'#101828'}>
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
      </Center>
    </>
  );
};
