import React, { useState } from 'react';
import { Popover } from '@mantine/core';
import { Menu } from '../../WonderMenu';
import { AppIcon } from './AppIcon';

interface IProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover
      opened={open}
      onChange={setOpen}
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
        <AppIcon onClick={() => setOpen(true)} />
      </Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  );
};
