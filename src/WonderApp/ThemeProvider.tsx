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
