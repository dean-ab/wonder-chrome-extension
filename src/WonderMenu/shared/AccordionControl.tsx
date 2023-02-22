import React, { useMemo } from 'react';
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  ThemeIcon,
} from '@mantine/core';
import { ReactComponent as SubmitIcon } from '../../assets/submit.svg';

interface IProps extends AccordionControlProps {
  onSubmit: any;
}

export const AccordionControl: React.FC<IProps> = (props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Accordion.Control
        icon={<ThemeIcon variant="outline">{props.icon}</ThemeIcon>}
        chevron={<></>}
        {...props}
      />
      <ActionIcon size="lg">
        <SubmitIcon
          style={{ height: 15, width: 15 }}
          onClick={props.onSubmit}
        />
      </ActionIcon>
    </Box>
  );
};
