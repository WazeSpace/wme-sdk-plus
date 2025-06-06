import { EventEffect } from './event-effect.js';

export interface EventDefinition {
  eventName: string;
  effect: EventEffect;
}
