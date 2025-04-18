import { MiddlewareError } from './middleware-error.js';

/**
 * Error specifically thrown by middleware to intentionally prevent an action.
 */
export class MiddlewarePreventedError extends MiddlewareError {
  constructor(message = 'Action prevented by middleware.') {
    super(message);
    this.name = 'MiddlewarePreventedError';
  }
}
