import React, { useEffect, useState } from "react";
import { useTextSelection } from "../hooks/useTextSelection";
import { flip, offset, shift, useFloating } from "@floating-ui/react";
import { ReactComponent as OwlIcon } from "../assets/overkill.svg";
import { ShadowDom } from "./ShadowDOM";
import styles from "./App.module.css";
export const Launcher: React.FC = () => {
  const selection = useTextSelection();
  const [open, setOpen] = useState(false);

  const { x, y, strategy, positionReference, floating } = useFloating({
    placement: "right",
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: 5, alignmentAxis: 4 }),
      flip({
        fallbackPlacements: ["top-end"],
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
      style={{
        position: strategy,
        left: x ?? 0,
        top: y ?? 0,
        transition: "0.2s",
        color: "white",
      }}
    >
      <ShadowDom>
        {open && (
          <div className={styles.wonder}>
            <OwlIcon style={{ height: 18, width: 18 }} />
          </div>
        )}
      </ShadowDom>
    </div>
  );
};
