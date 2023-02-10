import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { createPortal, unmountComponentAtNode } from "react-dom";
import { Launcher } from "./Launcher";

export function bootstrap() {
  const hostElement = document.createElement("div");
  hostElement.setAttribute("id", "wonder-app");

  document.body.appendChild(hostElement);

  ReactDOM.createRoot(hostElement).render(<Launcher />);
}

// const host = document.createElement("div");
// const reactRoot = document.createElement("div");
// const emotionRoot = document.createElement("style");
// const emotionCache = createEmotionCache({
//   key: "mantine",
//   container: emotionRoot,
// });

// const Portal: React.FC<{
//   rootId: string;
//   children: React.ReactNode;
// }> = ({ rootId, children }) => {
//   const target = useRef(document.getElementById(rootId));

//   useEffect(() => {
//     return () => {
//       window.requestAnimationFrame(() => {
//         if (target.current?.childNodes.length === 0) {
//           target.current.remove();
//           target.current = null;
//         }
//       });
//     };
//   }, [rootId]);

//   if (!target.current) {
//     target.current = document.createElement("div");
//     target.current.setAttribute("id", rootId);
//     document.body.appendChild(target.current);
//   }

//   return createPortal(children, target.current);
// };

// function initializeWonderApp() {
//   // get our shadow HOST
//   host.id = "wonder-shadow-root";
//   document.body.appendChild(host);
//   const shadow = host.attachShadow({ mode: "open" });

//   shadow.appendChild(emotionRoot);
//   shadow.appendChild(reactRoot);

//   mountApp();
// }

// function initializeWonderAppWithoutShadow() {
//   // get our shadow HOST
//   host.id = "wonder-shadow-root";
//   const shadow = host.attachShadow({ mode: "open" });

//   shadow.appendChild(emotionRoot);
//   shadow.appendChild(reactRoot);
//   document.body.appendChild(host);

//   mountApp();
// }

// function mountApp() {
//   ReactDOM.createRoot(reactRoot).render(<App />);
//   //   <React.StrictMode>
//   //     <MantineProvider
//   //       withNormalizeCSS
//   //       withGlobalStyles
//   //       emotionCache={emotionCache}
//   //       theme={{
//   //         colorScheme: "light",
//   //         colors: {
//   //           deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
//   //           blue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
//   //         },

//   //         shadows: {
//   //           md: "1px 1px 3px rgba(0, 0, 0, .25)",
//   //           xl: "5px 5px 3px rgba(0, 0, 0, .25)",
//   //         },

//   //         headings: {
//   //           fontFamily: "Roboto, sans-serif",
//   //           sizes: {
//   //             h1: { fontSize: 30 },
//   //           },
//   //         },
//   //       }}
//   //     >
//   //       <HighlightManager host={host}>
//   //         <App rootElement={host} />
//   //       </HighlightManager>
//   //     </MantineProvider>
//   //   </React.StrictMode>
//   // );
// }

// function unmountApp() {
//   unmountComponentAtNode(reactRoot);
// }

// initializeWonderAppWithoutShadow();

// const withMantine = (
//   <MantineProvider
//     withNormalizeCSS
//     withGlobalStyles
//     emotionCache={emotionCache}
//     theme={{
//       colorScheme: "light",
//       colors: {
//         deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
//         blue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
//       },

//       shadows: {
//         md: "1px 1px 3px rgba(0, 0, 0, .25)",
//         xl: "5px 5px 3px rgba(0, 0, 0, .25)",
//       },

//       headings: {
//         fontFamily: "Roboto, sans-serif",
//         sizes: {
//           h1: { fontSize: 30 },
//         },
//       },
//     }}
//   >
//     <HighlightManager host={host}></HighlightManager>
//   </MantineProvider>
// );
