import React, { useEffect, useRef } from "react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createPortal, unmountComponentAtNode } from "react-dom";
import { HighlightManager } from "./Highlighter";

// const ID = "wonder-highlighter";

// const wonderHighlighter = document.createElement("div");
// wonderHighlighter.id = ID;

// const setMarkerPosition = (style: any) => {
//   console.log("setMarkerPosition", style);
//   if (style.background) {
//     wonderHighlighter.style.background = style.background;
//   }

//   if (style.left) {
//     wonderHighlighter.style.left = `${style.left}px`;
//   }

//   if (style.right) {
//     wonderHighlighter.style.right = `${style.right}px`;
//   }

//   if (style.top) {
//     wonderHighlighter.style.top = `${style.top}px`;
//   }

//   if (style.bottom) {
//     wonderHighlighter.style.bottom = `${style.bottom}px`;
//   }

//   if (style.position) {
//     wonderHighlighter.style.position = style.position;
//   }

//   if (style.display) {
//     wonderHighlighter.style.display = style.display;

//     // TODO: Refactor this thing
//     if (style.display === "none") {
//       unmountApp();
//     } else {
//       mountApp();
//     }
//   }
// };

// const getSelectedText = () => window?.getSelection()?.toString();

// document.addEventListener("click", () => {
//   const selectedText = getSelectedText();

//   if (selectedText && selectedText?.length > 0) {
//     setMarkerPosition(getMarkerPosition());
//   }
// });

// document.addEventListener("selectionchange", () => {
//   const selectedText = getSelectedText();

//   if (selectedText?.length === 0) {
//     setMarkerPosition({ display: "none", background: "red" });
//   }
// });

// function getMarkerPosition() {
//   const selection = window?.getSelection();
//   if (!selection) return;

//   // @ts-ignore
//   const rangeBounds = selection
//     .getRangeAt(selection.rangeCount - 1)
//     .getBoundingClientRect();

//   console.log("RangeBound", rangeBounds);
//   return {
//     // Substract width of marker button -> 40px / 2 = 20
//     left: String(rangeBounds.left + window.scrollX),
//     top: String(rangeBounds.top + window.scrollY),
//     display: "flex",
//     position: "absolute",
//     background: "green",
//   };
// }

const host = document.createElement("div");
const reactRoot = document.createElement("div");
const emotionRoot = document.createElement("style");
const emotionCache = createEmotionCache({
  key: "mantine",
  container: emotionRoot,
});

const Portal: React.FC<{
  rootId: string;
  children: React.ReactNode;
}> = ({ rootId, children }) => {
  const target = useRef(document.getElementById(rootId));

  useEffect(() => {
    return () => {
      window.requestAnimationFrame(() => {
        if (target.current?.childNodes.length === 0) {
          target.current.remove();
          target.current = null;
        }
      });
    };
  }, [rootId]);

  if (!target.current) {
    target.current = document.createElement("div");
    target.current.setAttribute("id", rootId);
    document.body.appendChild(target.current);
  }

  return createPortal(children, target.current);
};

function initializeWonderApp() {
  // get our shadow HOST
  host.id = "wonder-shadow-root";
  document.body.appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });

  shadow.appendChild(emotionRoot);
  shadow.appendChild(reactRoot);

  mountApp();
}

function initializeWonderAppWithoutShadow() {
  // get our shadow HOST
  host.id = "wonder-shadow-root";
  const shadow = host.attachShadow({ mode: "open" });

  shadow.appendChild(emotionRoot);
  shadow.appendChild(reactRoot);
  document.body.appendChild(host);

  mountApp();
}

function mountApp() {
  ReactDOM.createRoot(reactRoot).render(<App />);
  //   <React.StrictMode>
  //     <MantineProvider
  //       withNormalizeCSS
  //       withGlobalStyles
  //       emotionCache={emotionCache}
  //       theme={{
  //         colorScheme: "light",
  //         colors: {
  //           deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
  //           blue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
  //         },

  //         shadows: {
  //           md: "1px 1px 3px rgba(0, 0, 0, .25)",
  //           xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  //         },

  //         headings: {
  //           fontFamily: "Roboto, sans-serif",
  //           sizes: {
  //             h1: { fontSize: 30 },
  //           },
  //         },
  //       }}
  //     >
  //       <HighlightManager host={host}>
  //         <App rootElement={host} />
  //       </HighlightManager>
  //     </MantineProvider>
  //   </React.StrictMode>
  // );
}

function unmountApp() {
  unmountComponentAtNode(reactRoot);
}

initializeWonderAppWithoutShadow();

const withMantine = (
  <MantineProvider
    withNormalizeCSS
    withGlobalStyles
    emotionCache={emotionCache}
    theme={{
      colorScheme: "light",
      colors: {
        deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
        blue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
      },

      shadows: {
        md: "1px 1px 3px rgba(0, 0, 0, .25)",
        xl: "5px 5px 3px rgba(0, 0, 0, .25)",
      },

      headings: {
        fontFamily: "Roboto, sans-serif",
        sizes: {
          h1: { fontSize: 30 },
        },
      },
    }}
  >
    <HighlightManager host={host}></HighlightManager>
  </MantineProvider>
);
