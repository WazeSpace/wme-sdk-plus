import { SdkPatcherRule } from '@wme-enhanced-sdk/sdk-patcher';
import { featureEditorRenderedEventDefinition } from './events/index.js';
import { EventEffectDestructor } from './interfaces/event-effect.js';
import { MethodInterceptor } from '@wme-enhanced-sdk/method-interceptor';

const EVENT_CLEANUPS_SYMBOL = Symbol('EVENT CLEANUPS');
const EVENTS = [
  featureEditorRenderedEventDefinition,
];

function hasEventByName(eventName: string): boolean {
  return EVENTS.some((event) => event.eventName === eventName);
}

export default [
  {
    install({ sdk, artifacts }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const eventBus = (sdk.Events as any).eventBus;
      const eventCleanups: EventEffectDestructor[] = [];
      EVENTS.forEach((eventDefinition) => {
        const cleanup = eventDefinition.effect({
          wmeSdk: sdk,
          eventBus: eventBus,
          trigger(detail) {
            eventBus.trigger(
              eventDefinition.eventName,
              detail,
            );
          },
        });
        if (cleanup) eventCleanups.push(cleanup);
      });
      artifacts[EVENT_CLEANUPS_SYMBOL] = eventCleanups;
    },
    uninstall({ artifacts }) {
      const effectCleanups: EventEffectDestructor[] = artifacts[EVENT_CLEANUPS_SYMBOL];
      effectCleanups.forEach((cleanup) => cleanup());
    }
  },
  ({ sdk }) => {
    const methodInterceptor = new MethodInterceptor(
      sdk.Events,
      'on',
      (trigger, options, ...restArgs) => {
        const triggerDefault = () => trigger(options, ...restArgs);

        const { eventName, eventHandler } = options;
        // we only process if we expect the shape: 1 arg only, we have an eventName of ours events, and an event handler
        if (restArgs.length || !eventName || !hasEventByName(eventName) || !eventHandler) {
          return triggerDefault();
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (sdk.Events as any).eventBus.on(eventName, eventHandler);
      }
    );

    methodInterceptor.enable();

    return () => {
      return methodInterceptor.disable();
    }
  },

  ({ sdk }) => {
    const methodInterceptor = new MethodInterceptor(
      sdk.Events,
      'once',
      (trigger, options, ...restArgs) => {
        const triggerDefault = () => trigger(options, ...restArgs);

        const { eventName } = options;
        // we only process if we expect the shape: 1 arg only, we have an eventName of ours events, and an event handler
        if (restArgs.length || !eventName || !hasEventByName(eventName)) {
          return triggerDefault();
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (sdk.Events as any).eventBus.once(eventName);
      }
    );

    methodInterceptor.enable();

    return () => {
      return methodInterceptor.disable();
    }
  },

  ({ sdk }) => {
    const methodInterceptor = new MethodInterceptor(
      sdk.Events,
      'off',
      (trigger, options, ...restArgs) => {
        const triggerDefault = () => trigger(options, ...restArgs);

        const { eventName, eventHandler } = options;
        // we only process if we expect the shape: 1 arg only, we have an eventName of ours events, and an event handler
        if (restArgs.length || !eventName || !hasEventByName(eventName) || !eventHandler) {
          return triggerDefault();
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (sdk.Events as any).eventBus.off(eventName, eventHandler);
      }
    );

    methodInterceptor.enable();

    return () => {
      return methodInterceptor.disable();
    }
  },
] as SdkPatcherRule[];
