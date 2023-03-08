import React from 'react';
import { Text } from '@mantine/core';

interface AccordionLabelProps {
  label: string;
  description: string;
}

export const AccordionLabel: React.FC<AccordionLabelProps> = ({
  label,
  description,
}) => {
  return (
    <div>
      <Text size={13} fw={600}>
        {label}
      </Text>
      <Text size={11} fw={400} color="#848485">
        {description}
      </Text>
    </div>
  );
};
