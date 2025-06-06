import { WmeSDK } from 'wme-sdk-typings';

export interface EventEffectParams {
  wmeSdk: WmeSDK;
  eventBus: WmeSDK['Events']['eventBus'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger(detail: any): void;
}
