import React, { useEffect, useState } from 'react';
import { useTextSelection } from '../hooks/useTextSelection';
import {
  flip,
  FloatingFocusManager,
  offset,
  shift,
  useFloating,
  useFocus,
  useInteractions,
  useMergeRefs,
} from '@floating-ui/react';
import { ShadowDom } from './ShadowDom';
import { ThemeProvider } from './ThemeProvider';
import { AppShell } from './AppShell/AppShell';
import { Menu } from '../WonderMenu';
import { FocusTrap } from '@mantine/core';
import { useFocusWithin } from '@mantine/hooks';

export const Launcher: React.FC = () => {
  const selection = useTextSelection();

  const { ref, focused } = useFocusWithin();

  const [open, setOpen] = useState(false);

  const { x, y, strategy, positionReference, floating, context, refs } =
    useFloating({
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

    console.log('Text Selection', selection.textContent, focused);

    setOpen(!!selection.textContent || focused);
    // selection.selection?.collapseToEnd();
  }, [selection.textContent, selection.clientRect, positionReference]);

  const focus = useFocus(context);

  const { getFloatingProps } = useInteractions([focus]);

  const mergedRef = useMergeRefs([ref, floating]);

  return (
    <div
      id="wonder-highlighter"
      ref={mergedRef}
      onClick={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      onMouseUp={(e) => e.preventDefault()}
      style={{
        position: strategy,
        left: x ?? 0,
        top: y ?? 0,
        zIndex: '2147483647',
        color: 'white',
        transition: 'all 0.2s ease-in-out',
        border: focused ? '1px solid black' : 'none',
      }}
      // {...getFloatingProps()}
    >
      <ShadowDom>
        <ThemeProvider>
          {open && (
            // <FloatingFocusManager
            //   context={context}
            //   order={['floating']}
            //   closeOnFocusOut={false}
            //   returnFocus={true}
            //   modal={true}
            //   // visuallyHiddenDismiss
            // >
            <AppShell>
              <Menu
                selectedText={selection.textContent}
                replaceSelection={selection.replaceSelection}
                isContentEditable={selection.isContentEditable}
                closeWidget={() => setOpen(false)}
              />
            </AppShell>
            // </FloatingFocusManager>
          )}
        </ThemeProvider>
      </ShadowDom>
    </div>
  );
};
