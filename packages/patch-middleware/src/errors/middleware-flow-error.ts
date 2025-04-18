import { MiddlewareError } from './middleware-error.js';

/**
 * Error indicating misuse of the next() function (e.g., called multiple times).
 */
export class MiddlewareFlowError extends MiddlewareError {
  constructor(message: string) {
    super(message);
    this.name = 'MiddlewareFlowError';
  }
}
