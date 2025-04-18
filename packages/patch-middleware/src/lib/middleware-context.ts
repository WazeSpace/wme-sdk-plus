import { DeepFrozen } from 'src/utils/deep-freeze.js';
import { WmeSDK } from 'wme-sdk-typings';

export class MiddlewareContext<D extends object> {
  /** The specific action point being intercepted */
  readonly actionPoint!: string;

    /**
   * The data associated with the action.
   * @mutable This object can be modified by the middleware. Changes made here will be passed downstream.
   * @example
   * ```ts
   * const data = context.data;
   * data.someProperty = 'new value';
   * ```
   */
  data: D;

  /**
   * An immutable snapshot of the {@link data} object *before* this middleware chain started.
   * @immutable This object cannot be modified by the middleware. It is a snapshot of the data before any changes were made.
   */
  readonly originalData!: Readonly<D>;

  /** Reference to the root {@link WmeSDK} instance. */
  readonly wmeSdk!: WmeSDK;

  constructor(
    actionPoint: string,
    data: D,
    originalData: DeepFrozen<D>,
    wmeSdk: WmeSDK
  ) {
    this.data = data;

    Object.defineProperty(this, 'actionPoint', {
      value: actionPoint,
      writable: false,
      configurable: false,
      enumerable: true,
    });
    Object.defineProperty(this, 'originalData', {
      value: originalData,
      writable: false,
      configurable: false,
      enumerable: true,
    });
    Object.defineProperty(this, 'wmeSdk', {
      value: wmeSdk,
      writable: false,
      configurable: false,
      enumerable: true,
    });
  }
}
