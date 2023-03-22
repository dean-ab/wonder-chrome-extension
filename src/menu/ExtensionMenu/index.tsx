import React, { useState, useEffect } from 'react';
import { Image, Flex, Group, Switch, Text, Center } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import '../../app/index.css';
import menuLogo from './menu-logo.png';
import menuGif from './menu-gif.gif';

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
            <Image
              maw={240}
              mx="auto"
              radius="md"
              src={menuLogo}
              alt="Random image"
            />
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
            maw={500}
            mx="auto"
            radius="md"
            src={menuGif}
            alt="Random image"
          />
          <Text fw={600} fz="lg" color={'#101828'}>
            Write smarter, edit faster, read better.
          </Text>
          <Text fw={400} fz="md" ta={'center'} color={'#475467'}>
            Simply select the text, click on the extension icon, choose the
            desired action, and let the magic happen!
          </Text>
          {/* <Text fz="sm" ta={'center'} color={'grey'}>
            Share with us your feedback feedback@wonder.ai
          </Text> */}
        </Flex>
      </Center>
    </>
  );
};
