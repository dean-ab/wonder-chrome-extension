import React, { useEffect, useState } from 'react';
import { useTextSelection } from '../hooks/useTextSelection';
import { flip, offset, shift, useFloating } from '@floating-ui/react';
import { ShadowDom } from './ShadowDom';
import { ThemeProvider } from './ThemeProvider';
import { AppShell } from './AppShell/AppShell';
import { Menu } from '../WonderMenu';
import { AnalyticsProvider } from '../../analytics';
import { WONDER_ACTIVE_STORAGE_KEY } from '../../menu/ExtensionMenu';

export const Launcher: React.FC = () => {
  const selection = useTextSelection();
  const [open, setOpen] = useState(false);
  const [isAppEnabled, setIsAppEnabled] = useState(true);

  useEffect(() => {
    chrome?.storage?.local.get([WONDER_ACTIVE_STORAGE_KEY], (result) => {
      setIsAppEnabled(!!result[WONDER_ACTIVE_STORAGE_KEY]);
    });
  }, [chrome?.storage?.local.get([WONDER_ACTIVE_STORAGE_KEY])]);

  const { x, y, strategy, positionReference, floating } = useFloating({
    placement: 'right',
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: 5, alignmentAxis: 4 }),
      flip({
        fallbackPlacements: ['top-end'],
      }),
      shift({ padding: 10 }),
    ],
  });

  useEffect(() => {
    if (selection.clientRect) {
      const virtualEl = {
        getBoundingClientRect() {
          return selection.clientRect as DOMRect;
        },
      };
      positionReference(virtualEl);
    }

    setOpen(!!selection.textContent);
  }, [selection.textContent, selection.clientRect, positionReference]);

  return (
    <>
      {isAppEnabled && (
        <div
          id="wonder-highlighter"
          ref={floating}
          onClick={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          style={{
            position: strategy,
            left: x ?? '50%',
            top: y ?? '50%',
            zIndex: '2147483647',
            color: 'white',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <ShadowDom>
            <ThemeProvider>
              <AnalyticsProvider>
                {open && (
                  <>
                    <AppShell selection={selection}>
                      <Menu
                        selectedText={selection.textContent}
                        replaceSelection={selection.replaceSelection}
                        isContentEditable={selection.isContentEditable}
                        closeWidget={() => setOpen(false)}
                      />
                    </AppShell>
                  </>
                )}
              </AnalyticsProvider>
            </ThemeProvider>
          </ShadowDom>
        </div>
      )}
    </>
  );
};
