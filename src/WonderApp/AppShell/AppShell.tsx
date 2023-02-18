import React, { useState } from 'react';
import { Popover } from '@mantine/core';
import { Menu } from '../../WonderMenu';
import { AppIcon } from './AppIcon';

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export const AppShell = ({ isOpen, setIsOpen }: IProps) => {
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
      <Popover.Dropdown>
        <Menu />
      </Popover.Dropdown>
    </Popover>
  );
};
