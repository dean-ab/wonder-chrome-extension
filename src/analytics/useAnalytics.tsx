
import React, { createContext, useContext } from "react";
import { AnalyticsService } from "./AnalyticsService";

const AnalyticsContext = createContext<AnalyticsService | null>(null);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <AnalyticsContext.Provider value={new AnalyticsService()}>{children}</AnalyticsContext.Provider>
}

export const useAnalytics = () => {
    const analytics = useContext(AnalyticsContext);

    if (!analytics) {
        throw new Error("AnalyticsService is not initialized");
    }

    return analytics;
}