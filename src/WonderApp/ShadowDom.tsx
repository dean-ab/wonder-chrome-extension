import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

export interface IShadowDomProps {
=  defensiveMode?: boolean;
  bypass?: boolean;
  rightToLeft?: boolean;
  onlyChildren?: boolean;
  onCreatedShadowDOM?: (root: ShadowRoot | Node) => void;
  children?: React.ReactNode;
}

const ShadowDomContext = createContext<{ root: ShadowRoot | Node | null }>({
  root: null,
});

export const useShadowRoot = () => {
  const { root } = useContext(ShadowDomContext);
  return root;
};

export const ShadowDom: FC<IShadowDomProps> = ({
  moduleName,
  rightToLeft = false,
  defensiveMode = false,
  bypass = false,
  onlyChildren = false,
  onCreatedShadowDOM = () => {},
  children,
}) => {
  const [root, setRoot] = useState<ShadowRoot | Node>();
  const [avoidShadowDom, setAvoidShadowDom] = useState(bypass);

  const shadowHostRef = useCallback((shadowHost: HTMLDivElement) => {
    console.log("hello world");
    if (shadowHost && !root) {
      const alreadyInShadowDom = shadowHost.getRootNode() instanceof ShadowRoot;
      const isSupported = !!shadowHost.attachShadow;
      let shadowRoot: ShadowRoot;

      console.log("hello world 2", {
        shadowHost,
        root,
        alreadyInShadowDom,
        isSupported,
      });

      if (!alreadyInShadowDom && isSupported) {
        shadowRoot = shadowHost.attachShadow({ mode: "open" });
        shadowHost.setAttribute("data-spot-im-shadow-host", moduleName);

        const styleElements = document.head.querySelectorAll<HTMLStyleElement>(
          `style[data-vite-dev-id]`
        );
        // const styleSheets = Array.from(styleElements ?? [])
        //   .map((styleElement) => styleElement?.sheet)
        //   .filter(Boolean);

        styleElements.forEach((s) => shadowRoot.appendChild(s.cloneNode(true)));

        setRoot(shadowRoot);
      } else {
        if (alreadyInShadowDom) {
          setRoot(shadowHost.getRootNode());
        }
        setAvoidShadowDom(true);
      }

      if (alreadyInShadowDom && !avoidShadowDom) {
        onCreatedShadowDOM(shadowHost.getRootNode());
      } else if (shadowRoot) {
        onCreatedShadowDOM(shadowRoot);
      }
    }
  }, []);

  if (avoidShadowDom) {
    return <>{children}</>;
  }

  return (
    <div ref={shadowHostRef}>
      {root &&
        createPortal(
          <ShadowDomContext.Provider value={{ root }}>
            {children}
          </ShadowDomContext.Provider>,
          root as any
        )}
    </div>
  );
};
