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
  GeneralParamGroup,
  LengthParams,
  OutputLanguageParams,
  PerspectiveParams,
  PurposeParams,
} from './Parameters';

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
          parametersMap={{ ...GeneralParamGroup }}
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
          parametersMap={{ ...GeneralParamGroup }}
          onSubmit={onSubmit}
        />

        <ActionWrapper
          updateHover={setAccordionValue}
          name="grammer"
          label="Spell check"
          description="Correct any grammatical & spelling errors or issues in your text."
          icon={<IconTextSpellcheck stroke={1} size={22} color="#553AF6" />}
          parametersMap={{}}
          onSubmit={onSubmit}
        />
      </Accordion>
    </Tabs.Panel>
  );
};
