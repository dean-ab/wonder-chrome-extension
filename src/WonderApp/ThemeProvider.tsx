import React, { useMemo } from 'react';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import { useShadowRoot } from './ShadowDom';

interface IProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<IProps> = ({ children }) => {
  const shadowRoot = useShadowRoot();
  const cache = useMemo(
    () =>
      createEmotionCache({
        key: 'orion',
        container: shadowRoot as Node,
      }),
    [],
  );
  return (
    <MantineProvider
      emotionCache={cache}
      withNormalizeCSS
      theme={{
        colors: {
          brand: [
            '#EAE7FE',
            '#C5BBFC',
            '#9F8FF9',
            '#7A64F7',
            '#5438F5',
            '#2F0CF3',
            '#250AC2',
            '#1C0792',
            '#130561',
            '#090231',
          ],
        },
        primaryColor: 'brand',
        components: {
          Affix: {
            defaultProps: {
              target: shadowRoot,
            },
          },
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};
