import React, { useState } from 'react';
import { Popover, Transition } from '@mantine/core';
import { Menu } from '../../WonderMenu';
import { AppIcon } from './AppIcon';

interface IProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: IProps) => {
  return (
    <Popover
      position="bottom-end"
      shadow="md"
      middlewares={{ flip: true, shift: true, inline: true }}
      styles={() => ({
        dropdown: {
          padding: 0,
        },
      })}
    >
      <Popover.Target>
        <AppIcon />
      </Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  );
};
