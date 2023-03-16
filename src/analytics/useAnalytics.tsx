import React, { createContext, useContext } from 'react';
import { AnalyticsService, MockAnalyticsService } from './AnalyticsService';

const IS_DEV = import.meta.env.DEV;

const AnalyticsContext = createContext<AnalyticsService | null>(null);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AnalyticsContext.Provider
      value={IS_DEV ? new MockAnalyticsService() : new AnalyticsService()}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const analytics = useContext(AnalyticsContext);

  if (!analytics) {
    throw new Error('AnalyticsService is not initialized');
  }

  return analytics;
};
