import React, { useEffect, useState } from 'react';
import { Popover, Transition } from '@mantine/core';
import { Menu } from '../../WonderMenu';
import { AppIcon } from './AppIcon';
import { Events, useAnalytics } from '../../../analytics';

interface IProps {
  children: React.ReactNode;
  selection: any;
}

export const AppShell = ({ children, selection }: IProps) => {
  const analytics = useAnalytics();
  const initialMode = selection.isContentEditable ? "edit" : "read";

  const onMount = () => {
    analytics.track(Events.MainIconViewed, { text: selection.textContent, mode: initialMode });
  };

  const onAppIconClick = () => {
    analytics.track(Events.MainIconClicked, { text: selection.textContent, mode: initialMode });
  }

  const onMenuOpened = () => {
    analytics.track(Events.MainMenuViewed, { text: selection.textContent, mode: initialMode })
  }

  useEffect(onMount, []);

  return (
    <Popover
      position="bottom-end"
      shadow="md"
      width={500}
      middlewares={{ flip: true, shift: true, inline: true }}
      styles={() => ({
        dropdown: {
          padding: 0,
        },
      })}
      onOpen={onMenuOpened}
    >
      <Popover.Target>
        <AppIcon onClick={onAppIconClick} />
      </Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  );
};
