import { useState, useEffect } from 'react';

export const WONDER_COUNTER_STORAGE_KEY = 'wonder-counter';

interface UseLimiterHook {
  submitCount: number;
  incrementSubmitCount: () => void;
  resetCount: () => void;
}

const useLimiter = (): UseLimiterHook => {
  const [submitCount, setSubmitCount] = useState<Record<string, number>>({});

  useEffect(() => {
    chrome?.storage?.local?.get([WONDER_COUNTER_STORAGE_KEY], (result) => {
      if (result[WONDER_COUNTER_STORAGE_KEY]) {
        setSubmitCount({ ...result[WONDER_COUNTER_STORAGE_KEY] });
      } else {
        setSubmitCount({ [getStartOfToday()]: 0 });
      }
    });
  }, []);

  const incrementSubmitCount = () => {
    const newSubmitCount = {
      ...submitCount,
      [getStartOfToday()]:
        submitCount?.[getStartOfToday()] > 0
          ? submitCount?.[getStartOfToday()] + 1
          : 1,
    };

    setSubmitCount(newSubmitCount);
    chrome?.storage?.local?.set({
      [WONDER_COUNTER_STORAGE_KEY]: newSubmitCount,
    });
  };

  const resetCount = () => {
    const resetSubmitCount = {
      ...submitCount,
      [getStartOfToday()]: 0,
    };

    setSubmitCount(resetSubmitCount);
    chrome?.storage?.local?.set({
      [WONDER_COUNTER_STORAGE_KEY]: resetSubmitCount,
    });
  };

  const count = submitCount[getStartOfToday()];

  return { submitCount: count, incrementSubmitCount, resetCount };
};

const getStartOfToday = (): string => {
  return new Date().toISOString().slice(0, 10);
};

export default useLimiter;
