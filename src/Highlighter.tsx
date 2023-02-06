import React, { Children, useEffect, useRef, useState } from "react";
import App from "./App";

export const HighlightManager = ({
  host,
  children,
}: {
  host: any;
  children?: React.ReactNode;
}) => {
  const container = useRef<HTMLDivElement>();
  const [state, setState] = useState<any>({});
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    // const _container = document.createElement("div");
    // _container.style.position = "absolute";
    // _container.style.background = "red";
    // _container.style.top = "0px";
    // _container.style.left = "0px";
    // _container.style.width = "400px";
    // _container.style.height = "400px";
    // _container.innerText = "Hello from Wonder";

    // container.current = _container;
    // host.appendChild(container.current);

    const setMarkerPosition = (style: any = {}) => {
      console.log("setMarkerPosition", style);

      setState({
        background: style?.background,
        left: `${style?.left}px`,
        right: `${style?.right}px`,
        top: `${style?.top}px`,
        bottom: `${style?.bottom}px`,
        position: style?.position,
        display: style?.display,
      });
    };

    const getSelection = () =>
      window.getSelection() || (host.getRootNode() as Document).getSelection();
    const getSelectedText = () => getSelection()?.toString();

    document.addEventListener("click", () => {
      console.log("CLICK");
      const selectedText = getSelectedText();
      console.log("CLICK selectedText", selectedText);

      if (selectedText && selectedText?.length > 0) {
        setMarkerPosition(getMarkerPosition());
      } else {
        setMarkerPosition({ display: "none", background: "red" });
      }
    });

    document.addEventListener("selectionchange", () => {
      console.log("selectionchange");

      const selectedText = getSelectedText();
      console.log("selectionchange selectedText", selectedText);

      if (selectedText?.length === 0) {
        // setMarkerPosition({ display: "none", background: "red" });
      }
    });

    function getMarkerPosition() {
      const selection = getSelection();
      console.log("getMarkerPosition", selection);
      if (!selection) return {};

      // @ts-ignore
      const rangeBounds = selection
        .getRangeAt(selection.rangeCount - 1)
        .getBoundingClientRect();

      const isContentEditable = (selection.anchorNode?.parentNode as any)
        .contentEditable;
      console.log("RangeBound", { rangeBounds, isContentEditable });
      return {
        // Substract width of marker button -> 40px / 2 = 20
        left: String(rangeBounds.left + window.scrollX),
        top: String(rangeBounds.top + window.scrollY),
        display: "flex",
        position: "absolute",
        background: "green",
      };
    }

    return () => {
      console.log("Unmounting");
      if (container.current) {
        console.log("Unmounting");
        container.current.remove();
      }
    };
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      id="react-div-id"
      style={{
        left: state.left,
        top: state.top,
        display: state.display,
        background: state.background,
        position: "absolute",
        width: 200,
        height: 200,
      }}
    >
      isContentEditable -
      <App value={selectedText} />
    </div>
  );
};
