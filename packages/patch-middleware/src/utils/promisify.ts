/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Takes a function that might return a value T or a Promise<T>,
 * and returns a new function that always returns a Promise<T>.
 * It handles both synchronous return values and promises, as well
 * as synchronous errors thrown by the original function.
 *
 * @template T The type of the resolved value.
 * @template Args The type of the arguments tuple for the function.
 * @param fn The function to promisify. It can accept any number of arguments
 * and return either a value T or a Promise<T>.
 * @returns A new function that accepts the same arguments as fn, but always
 * returns a Promise<T>. If fn throws synchronously, the returned
 * promise will be rejected with the error.
 */
export function promisify<T, Args extends any[]>(
  fn: (...args: Args) => T | Promise<T>
): (...args: Args) => Promise<T> {
  return function (this: ThisType<T>, ...args: Args): Promise<T> {
      try {
          // Execute the original function
          const resultOrPromise = fn.apply(this, args);

          // Use Promise.resolve() to handle both direct values and promises.
          // If resultOrPromise is T, it becomes Promise<T>.
          // If resultOrPromise is Promise<T>, it remains Promise<T>.
          return Promise.resolve(resultOrPromise);
      } catch (error) {
          // If fn throws a synchronous error, catch it and return a rejected promise.
          return Promise.reject(error);
      }
  };
}
