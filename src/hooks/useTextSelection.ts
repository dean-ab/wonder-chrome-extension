import { useCallback, useLayoutEffect, useState } from "react";

/**
 * @param {*} ctx The context
 * @param {function} func The function to execute after the debounce time
 * @param {number} delay The amount of time to wait
 * @return {function} The debounced function
 */
export const debounce = (func: any, delay: number) => {
  let timeout: any;

  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

type ClientRect = Record<keyof Omit<DOMRect, "toJSON">, number>;

function roundValues(_rect: ClientRect) {
  const rect = {
    ..._rect,
  };
  for (const key of Object.keys(rect)) {
    // @ts-ignore
    rect[key] = Math.round(rect[key]);
  }
  return rect;
}

function shallowDiff(prev: any, next: any) {
  if (prev != null && next != null) {
    for (const key of Object.keys(next)) {
      if (prev[key] != next[key]) {
        return true;
      }
    }
  } else if (prev != next) {
    return true;
  }
  return false;
}

type TextSelectionState = {
  clientRect?: ClientRect;
  isCollapsed?: boolean;
  textContent?: string;
  selection?: Selection;
};

const defaultState: TextSelectionState = {};

/**
 * useTextSelection(ref)
 *
 * @description
 * hook to get information about the current text selection
 *
 */
export function useTextSelection(target?: HTMLElement) {
  const [{ clientRect, isCollapsed, textContent, selection }, setState] =
    useState<TextSelectionState>(defaultState);

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  const handler = useCallback(() => {
    let newRect: ClientRect;
    const selection = window.getSelection();
    let newState: TextSelectionState = {};

    console.log("Handler", selection, selection?.toString());

    if (selection == null || !selection.rangeCount) {
      setState(newState);
      return;
    } else {
      newState.selection = selection;
    }

    const range = selection.getRangeAt(0);

    if (target != null && !target.contains(range.commonAncestorContainer)) {
      setState(newState);
      return;
    }

    if (range == null) {
      setState(newState);
      return;
    }

    const contents = range.cloneContents();
    const selectionString = selection.toString();

    // if (contents.textContent != null || selectionString != null) {
    if (contents.textContent != null) {
      // const textContent = contents.textContent || selectionString;
      const textContent = contents.textContent;
      const trimmedText = textContent.trim();

      if (trimmedText.length > 0) {
        newState.textContent = trimmedText;
      }
    }

    const rects = range.getClientRects();

    console.log("range", { range, contents, rects });

    if (rects.length === 0 && range.commonAncestorContainer != null) {
      const el = range.commonAncestorContainer as HTMLElement;

      newRect = roundValues(el.getBoundingClientRect().toJSON());
    } else {
      if (rects.length < 1) return;
      newRect = roundValues(rects[rects.length - 1].toJSON());
    }
    if (shallowDiff(clientRect, newRect)) {
      newState.clientRect = newRect;
    }
    newState.isCollapsed = range.collapsed;

    setState(newState);
  }, [target]);

  useLayoutEffect(() => {
    const debouncedHandler = debounce(handler, 200);
    document.addEventListener("selectionchange", debouncedHandler);
    document.addEventListener("keydown", handler);
    document.addEventListener("keyup", handler);
    window.addEventListener("resize", handler);

    return () => {
      document.removeEventListener("selectionchange", debouncedHandler);
      document.removeEventListener("keydown", handler);
      document.removeEventListener("keyup", handler);
      window.removeEventListener("resize", handler);
    };
  }, [target]);

  return {
    clientRect,
    isCollapsed,
    textContent,
    selection,
  };
}
