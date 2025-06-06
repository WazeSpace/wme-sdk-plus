import { EventEffectParams } from './event-effect-params.js';

export type EventEffectDestructor = () => void;
export type EventEffect = (params: EventEffectParams) => void | EventEffectDestructor;
