import React, { useMemo } from 'react';
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Button,
  ThemeIcon,
} from '@mantine/core';
import { ReactComponent as SubmitIcon } from '../../../assets/submit.svg';

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
      <Button onClick={props.onSubmit} bg={'transparent'} variant="subtle">
        <SubmitIcon style={{ height: 18, width: 18 }} />
      </Button>
    </Box>
  );
};
