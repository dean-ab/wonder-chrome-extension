import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

export interface IShadowDomProps {
  bypass?: boolean;
  children: React.ReactNode;
}

const ShadowDomContext = createContext<{ root: ShadowRoot | Node | null }>({
  root: null,
});

export const useShadowRoot = () => {
  const { root } = useContext(ShadowDomContext);
  return root;
};

export const ShadowDom: FC<IShadowDomProps> = ({
  bypass = false,
  children,
}) => {
  const [root, setRoot] = useState<ShadowRoot | Node>();
  const [avoidShadowDom, setAvoidShadowDom] = useState(bypass);

  const shadowHostRef = useCallback((shadowHost: HTMLDivElement) => {
    if (shadowHost && !root) {
      const alreadyInShadowDom = shadowHost.getRootNode() instanceof ShadowRoot;
      const isSupported = !!shadowHost.attachShadow;
      let shadowRoot: ShadowRoot;

      if (!alreadyInShadowDom && isSupported) {
        shadowRoot = shadowHost.attachShadow({ mode: "open" });

        // TODO: Figure out how injecting style elements on built version.
        const styleElements = document.head.querySelectorAll<HTMLStyleElement>(
          `style[data-vite-dev-id]`
        );

        styleElements.forEach((s) => shadowRoot.appendChild(s.cloneNode(true)));

        setRoot(shadowRoot);
      } else {
        if (alreadyInShadowDom) {
          setRoot(shadowHost.getRootNode());
        }
        setAvoidShadowDom(true);
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
