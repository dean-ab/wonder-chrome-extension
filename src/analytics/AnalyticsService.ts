import mixpanel, { Callback, RequestOptions } from 'mixpanel-browser';
import { Events } from './Events';

const API_KEY = '4d50fa3ebdaf39596c1105808e059777';

interface IAnalyticsService {
  track(
    eventName: Events,
    props?: Record<string, any>,
    optionsOrCallback?: RequestOptions | Callback,
    callback?: Callback,
  ): void;
}

export class AnalyticsService implements IAnalyticsService {
  constructor() {
    mixpanel.init(API_KEY, {
      debug: true,
      api_host: 'https://api.mixpanel.com',
    });
  }

  public track(
    eventName: Events,
    props?: Record<string, any>,
    optionsOrCallback?: RequestOptions | Callback,
    callback?: Callback,
  ): void {
    console.log();
    // console.log("Mixpanel", { eventName, props });
    return mixpanel.track(eventName, props, optionsOrCallback, callback);
  }
}

export class MockAnalyticsService implements IAnalyticsService {
  track(
    eventName: Events,
    props?: Record<string, any>,
    optionsOrCallback?: any,
    callback?: any,
  ): void {
    console.log('Mock Analytics Service', { eventName, props });
  }
}
