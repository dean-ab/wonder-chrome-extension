import React, { useState } from 'react';
import { Accordion, Tabs, Text } from '@mantine/core';
import { ActionWrapper } from './shared/ActionWrapper';
import {
  IconAdjustmentsHorizontal,
  IconTextSpellcheck,
  IconWriting,
} from '@tabler/icons-react';

export const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('edit');

  return (
    <div>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List grow defaultValue="edit">
          <Tabs.Tab value="edit">Edit</Tabs.Tab>
          <Tabs.Tab value="read">Read</Tabs.Tab>
          <Tabs.Tab value="write" disabled>
            Write (Coming soon)
          </Tabs.Tab>
        </Tabs.List>

        {/* Edit */}
        <Tabs.Panel value="edit">
          <Accordion
            // sx={{ maxWidth: 600 }}
            mx="auto"
            styles={{
              control: {
                '&[data-active]': {
                  ':hover': {
                    backgroundColor: 'transparent',
                  },
                },
              },
            }}
          >
            <ActionWrapper
              name="rewrite"
              label="Rewrite"
              description="Make significant adjustments to make it clearer or more concise."
              parametersMap={{
                'Tone of voice': ['Casual', 'Formal'],
                Length: ['short', 'medium', 'long'],
                Format: ['Paragraph', 'Bullet points', 'Numbered list'],
              }}
              initialParam="Tone of voice"
              icon={<IconWriting stroke={1} size={22} color="#553AF6" />}
            />

            <ActionWrapper
              name="tune"
              label="Tune"
              description="Make slight adjustments without changing the overall meaning."
              icon={
                <IconAdjustmentsHorizontal
                  stroke={1}
                  size={22}
                  color="#553AF6"
                />
              }
              parametersMap={{}}
              initialParam="Tone of voice"
            />

            <ActionWrapper
              name="spell_check"
              label="Spell check"
              description="Correct any grammatical & spelling errors or issues in your text."
              icon={<IconTextSpellcheck stroke={1} size={22} color="#553AF6" />}
              parametersMap={{}}
              initialParam="Tone of voice"
            />
          </Accordion>
        </Tabs.Panel>

        <Tabs.Panel value="read">First panel</Tabs.Panel>
      </Tabs>
    </div>
  );
};
