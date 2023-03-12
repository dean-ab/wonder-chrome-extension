import mixpanel, { Callback, RequestOptions } from 'mixpanel-browser';

const API_KEY = '4d50fa3ebdaf39596c1105808e059777';


export class AnalyticsService {
    constructor() {
        mixpanel.init(API_KEY, { debug: true, api_host: "https://api.mixpanel.com" });
    }

    public track(
        eventName: string,
        props?: Record<string, any>,
        optionsOrCallback?: RequestOptions | Callback,
        callback?: Callback,
    ): void {
        console.log("Mixpanel", { eventName, props });
        return mixpanel.track(eventName, props, optionsOrCallback, callback);
    }
}