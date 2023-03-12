import React, { useState } from 'react';
import { Accordion, Tabs } from '@mantine/core';
import { ActionWrapper } from './shared/ActionWrapper';
import {
  IconAdjustmentsHorizontal,
  IconTextSpellcheck,
  IconWriting,
} from '@tabler/icons-react';

interface IProps {
  onSubmit: any;
}

export const EditTab: React.FC<IProps> = ({ onSubmit }) => {
  const [accordionValue, setAccordionValue] = useState<string | null>(null);

  return (
    <Tabs.Panel value="edit">
      <Accordion
        mx="auto"
        styles={{
          control: {
            paddingBottom: 6,
            '&[data-active]': {
              ':hover': {
                backgroundColor: 'transparent',
              },
            },
          },
        }}
      >
        <ActionWrapper
          updateHover={setAccordionValue}
          name="rewrite"
          label="Rewrite"
          description="Make significant adjustments to make it clearer or more concise."
          parametersMap={{
            Tone: [
              'Formal',
              'Informal',
              'Sarcastic',
              'Polite',
              'Humorous',
              'Serious',
              'Professional',
              'Friendly',
              'Presuasive',
              'Empathic',
              'Condescending',
            ],
            Style: [
              'Academic',
              'Technical',
              'Creative',
              'Descriptive',
              'Persuasive',
            ],
            'Target audience': [
              'Children',
              'Teenagers',
              'Adults',
              'Seniors',
              'Professinals',
              'Experts',
            ],
            Length: ['Short', 'Medium', 'Long', 'Very long'],
            Format: [
              'Article',
              'Blog post',
              'Research paper',
              'Speech',
              'Email',
            ],
            'Grammer and punctuation': [
              'American Eng',
              'British Eng',
              'Australian Eng',
              'Indian Eng',
              'Chinese Eng',
            ],
          }}
          icon={<IconWriting stroke={1} size={22} color="#553AF6" />}
          onSubmit={onSubmit}
        />

        <ActionWrapper
          updateHover={setAccordionValue}
          name="tune"
          label="Tune"
          description="Make slight adjustments without changing the overall meaning."
          icon={
            <IconAdjustmentsHorizontal stroke={1} size={22} color="#553AF6" />
          }
          parametersMap={{
            Tone: ['Casual', 'Formal'],
            Length: ['Short', 'Medium', 'Long'],
            Format: ['Paragraph', 'Bullet points', 'Numbered list'],
          }}
          onSubmit={onSubmit}
        />

        <ActionWrapper
          updateHover={setAccordionValue}
          name="spell_check"
          label="Spell check"
          description="Correct any grammatical & spelling errors or issues in your text."
          icon={<IconTextSpellcheck stroke={1} size={22} color="#553AF6" />}
          parametersMap={{
            Tone: ['Casual', 'Formal'],
            Length: ['Short', 'Medium', 'Long'],
            Format: ['Paragraph', 'Bullet points', 'Numbered list'],
          }}
          onSubmit={onSubmit}
        />
      </Accordion>
    </Tabs.Panel>
  );
};
