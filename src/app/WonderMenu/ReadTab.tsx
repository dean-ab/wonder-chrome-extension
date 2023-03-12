import React, { useState } from 'react';
import { Accordion, Tabs } from '@mantine/core';
import { ActionWrapper } from './shared/ActionWrapper';
import {
  IconAdjustmentsHorizontal,
  IconTextSpellcheck,
  IconWriting,
} from '@tabler/icons-react';
import {
  DetailLevelParams,
  FocusOnParams,
  GrammerAndPunctuationParams,
  LengthParams,
  OutputLanguageParams,
  PerspectiveParams,
  PurposeParams,
  StyleParams,
  ToneParams,
} from './Parameters';

interface IProps {
  onSubmit: any;
}

export const ReadTab: React.FC<IProps> = ({ onSubmit }) => {
  const [accordionValue, setAccordionValue] = useState<string | null>(null);

  return (
    <Tabs.Panel value="read">
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
          name="summary"
          label="Summarize"
          description="Condense the main ideas and key points of your content into a brief and concise summary."
          parametersMap={{
            ...FocusOnParams,
            ...LengthParams,
            ...PurposeParams,
            ...PerspectiveParams,
            ...DetailLevelParams,
          }}
          icon={<IconWriting stroke={1} size={22} color="#553AF6" />}
          onSubmit={onSubmit}
        />

        <ActionWrapper
          updateHover={setAccordionValue}
          name="explain"
          label="Explain"
          description="Get clear and detailed understanding of your content."
          icon={
            <IconAdjustmentsHorizontal stroke={1} size={22} color="#553AF6" />
          }
          parametersMap={{
            ...LengthParams,
            ...DetailLevelParams,
            ...PurposeParams,
            ...ToneParams,
            ...StyleParams,
            ...GrammerAndPunctuationParams,
          }}
          onSubmit={onSubmit}
        />

        <ActionWrapper
          updateHover={setAccordionValue}
          name="translate"
          label="Translate"
          description="Convert your text from one language to another."
          icon={<IconTextSpellcheck stroke={1} size={22} color="#553AF6" />}
          parametersMap={{ ...OutputLanguageParams }}
          onSubmit={onSubmit}
        />
      </Accordion>
    </Tabs.Panel>
  );
};
