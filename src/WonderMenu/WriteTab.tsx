import React, { useState } from 'react';
import { Accordion, Tabs } from '@mantine/core';
import { ActionWrapper } from './shared/ActionWrapper';
import {
  IconAdjustmentsHorizontal,
  IconTextSpellcheck,
  IconWriting,
} from '@tabler/icons-react';

export const WriteTab: React.FC = () => {
  return (
    <Tabs.Panel value="write">
      <></>
    </Tabs.Panel>
  );
};
