import React from 'react';
import { ActionIcon } from '@mantine/core';
import { ReactComponent as SubmitIcon } from '../assets/submit.svg';

export const SendButton: React.FC<{}> = ({}) => {
  return (
    <ActionIcon>
      <SubmitIcon
        style={{ height: 13, width: 13 }}
        onClick={() => {
          console.log('here');
        }}
      />
    </ActionIcon>
  );
};
