import { Button, Text, Popover } from "@mantine/core";
import React, { useState } from "react";
import { AppIcon } from "./AppIcon";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export const AppShell = ({ isOpen, setIsOpen }: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      opened={open}
      onChange={setOpen}
      position="bottom-end"
      shadow="md"
      middlewares={{ flip: true, shift: true, inline: true }}
    >
      <Popover.Target>
        <AppIcon onClick={() => setOpen(true)} />
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm" color={"black"}>
          This is uncontrolled popover, it is opened when button is clicked
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};
