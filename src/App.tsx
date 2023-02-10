import React, { useEffect, useState } from "react";
import { useTextSelection as useMantineTextSelection } from "@mantine/hooks";
import { useTextSelection } from "./hooks/useTextSelection";
import {
  autoUpdate,
  flip,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { ReactComponent as OwlIcon } from "./assets/robot.svg";
import "./App.css";

interface Props {
  // rootElement: HTMLElement;
  value: string;
}

export interface HighlightPosition {
  pageWidth: number;
  pageHeight: number;
  rect: DOMRect;
}
// Selection

const getSelection = () => window.getSelection();
const getSelectedText = () => getSelection()?.toString();

function App() {
  // const mantineSelection = useMantineTextSelection();
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

  const text = selection.textContent;

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
      <input value={"hello world"} />
      <blockquote contentEditable="true">
        <p>Edit this content to add your own quote</p>
      </blockquote>
      <ul style={{ border: "1px solid white" }}>
        <p>Mantine Selection: {text}</p>
        <p>
          {selection.clientRect?.x} y: {selection.clientRect?.y}
        </p>
        <li>Add event listeners</li>
        <li>Open the portal with shdow dom on selection</li>
        <textarea />
      </ul>

      {/* <div
        style={{
          position: "absolute",
          top: `${selection.clientRect?.top}px`,
          left: `${selection.clientRect?.left}px`,
          backgroundColor: "tomato",
          color: "black",
        }}
      >
        <div id="wow">{selection.selection && text}</div>

        
      </div> */}

      <div
        id="wonder-highlighter"
        ref={floating}
        style={{
          position: strategy,
          left: x ?? 0,
          top: y ?? 0,
          // background: "black",
          transition: "0.2s",
          color: "white",
          // padding: open ? 5 : 0,
        }}
      >
        {open && (
          <div className="wonder">
            <OwlIcon style={{ height: 18, width: 18 }} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
