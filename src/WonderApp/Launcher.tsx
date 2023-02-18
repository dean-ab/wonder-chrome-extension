import React, { useEffect, useState } from 'react';
import { useTextSelection } from '../hooks/useTextSelection';
import { flip, offset, shift, useFloating } from '@floating-ui/react';
import { ShadowDom } from './ShadowDom';
import { ThemeProvider } from './ThemeProvider';
import { AppShell } from './AppShell/AppShell';

export const Launcher: React.FC = () => {
  const selection = useTextSelection();
  const [open, setOpen] = useState(false);

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
    <div
      id="wonder-highlighter"
      ref={floating}
      onClick={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      onMouseUp={(e) => e.preventDefault()}
      style={{
        position: strategy,
        left: x ?? 0,
        top: y ?? 0,
        zIndex: '2147483647',
        color: 'white',
      }}
    >
      <ShadowDom>
        <ThemeProvider>
          {open && <AppShell isOpen={open} setIsOpen={setOpen} />}
        </ThemeProvider>
      </ShadowDom>
    </div>
  );
};
