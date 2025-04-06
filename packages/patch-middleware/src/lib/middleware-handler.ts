import { MiddlewareContext } from './middleware-context.js';

export type NextFunction<R> = () => Promise<R | null>;

export type MiddlewareHandler<D extends object, R> = (
  context: MiddlewareContext<D>,
  next: NextFunction<R>,
) => Promise<void> | void;

export type UnregisterFunction = () => void;
