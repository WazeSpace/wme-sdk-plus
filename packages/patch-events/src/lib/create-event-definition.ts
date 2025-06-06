import { EventDefinition } from '../interfaces/event-definition.js';
import { EventEffect } from '../interfaces/event-effect.js';

export function createEventDefinition(
  eventName: string,
  eventEffect: EventEffect,
): EventDefinition {
  return {
    eventName,
    effect: eventEffect,
  };
}
