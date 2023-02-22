import { Tabs } from '@mantine/core';
import React, { useState } from 'react';
import { Accordion, Tabs, Text } from '@mantine/core';
import { ActionWrapper } from './shared/ActionWrapper';
import {
  IconAdjustmentsHorizontal,
  IconTextSpellcheck,
  IconWriting,
} from '@tabler/icons-react';
import { EditTab } from './EditTab';
import { ReadTab } from './ReadTab';
import { WriteTab } from './WriteTab';

export const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('edit');
  const [accordionValue, setAccordionValue] = useState<string | null>(null);

  return (
    <div>
      <Tabs value={activeTab} onTabChange={setActiveTab} color="indigo">
        <Tabs.List grow defaultValue="edit">
          <Tabs.Tab value="edit">Edit</Tabs.Tab>
          <Tabs.Tab value="read">Read</Tabs.Tab>
          <Tabs.Tab value="write" disabled>
            Write (Coming soon)
          </Tabs.Tab>
        </Tabs.List>
        <EditTab />
        <ReadTab />
        <WriteTab />
      </Tabs>
    </div>
  );
};
