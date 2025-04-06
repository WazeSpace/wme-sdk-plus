import { describe, it, expect } from 'vitest';
import { promisify } from './promisify.js';

describe('promisify', () => {
  // --- Test synchronous functions ---

  it('should wrap a synchronous function returning a value', async () => {
    const syncFunc = (a: number, b: string) => `${b}-${a}`;
    const promisifiedFunc = promisify(syncFunc);

    const resultPromise = promisifiedFunc(123, 'test');

    expect(resultPromise).toBeInstanceOf(Promise);
    await expect(resultPromise).resolves.toBe('test-123');
  });

  it('should handle synchronous functions returning void', async () => {
    let sideEffect = false;
    const syncVoidFunc = () => {
      sideEffect = true;
    };
    const promisifiedFunc = promisify(syncVoidFunc);

    const resultPromise = promisifiedFunc();

    expect(resultPromise).toBeInstanceOf(Promise);
    await expect(resultPromise).resolves.toBeUndefined();
    expect(sideEffect).toBe(true); // Verify the original function was called
  });

  it('should handle synchronous functions returning null or undefined', async () => {
    const syncNullFunc = () => null;
    const syncUndefinedFunc = () => undefined;

    const promisifiedNull = promisify(syncNullFunc);
    const promisifiedUndefined = promisify(syncUndefinedFunc);

    await expect(promisifiedNull()).resolves.toBeNull();
    await expect(promisifiedUndefined()).resolves.toBeUndefined();
  });

  // --- Test asynchronous functions ---

  it('should handle an asynchronous function (returning Promise)', async () => {
    const asyncFunc = async (val: number) => {
      await new Promise(res => setTimeout(res, 10)); // simulate async work
      return val * 2;
    };
    const promisifiedFunc = promisify(asyncFunc);

    const resultPromise = promisifiedFunc(10);

    expect(resultPromise).toBeInstanceOf(Promise);
    await expect(resultPromise).resolves.toBe(20);
  });

   it('should handle an asynchronous function returning void Promise', async () => {
    let sideEffect = false;
    const asyncVoidFunc = async (): Promise<void> => {
      await new Promise(res => setTimeout(res, 10));
      sideEffect = true;
    };
    const promisifiedFunc = promisify(asyncVoidFunc);

    const resultPromise = promisifiedFunc();

    expect(resultPromise).toBeInstanceOf(Promise);
    await expect(resultPromise).resolves.toBeUndefined();
    expect(sideEffect).toBe(true); // Verify the original function ran
  });

  // --- Test error handling ---

  it('should handle synchronous errors thrown by the function', async () => {
    const error = new Error('Sync error!');
    const syncThrowingFunc = () => {
      throw error;
    };
    const promisifiedFunc = promisify(syncThrowingFunc);

    const resultPromise = promisifiedFunc();

    expect(resultPromise).toBeInstanceOf(Promise);
    await expect(resultPromise).rejects.toThrow(error);
    await expect(resultPromise).rejects.toBe(error);
  });

  it('should handle rejected promises from an async function', async () => {
    const error = new Error('Async rejection!');
    const asyncRejectingFunc = async () => {
      await new Promise(res => setTimeout(res, 10));
      throw error; // Async functions return rejected promises when throwing
    };
    const promisifiedFunc = promisify(asyncRejectingFunc);

    const resultPromise = promisifiedFunc();

    expect(resultPromise).toBeInstanceOf(Promise);
    await expect(resultPromise).rejects.toThrow(error);
    await expect(resultPromise).rejects.toBe(error);
  });

  // --- Test argument passing ---

  it('should correctly pass arguments to the underlying function', async () => {
    const syncFunc = (a: number, b: boolean, c: string) => `${a}-${b}-${c}`;
    const asyncFunc = async (a: number, b: boolean, c: string) => {
      await new Promise(res => setTimeout(res, 5));
      return `${a}-${b}-${c}`;
    };

    const promisifiedSync = promisify(syncFunc);
    const promisifiedAsync = promisify(asyncFunc);

    await expect(promisifiedSync(1, true, 'sync')).resolves.toBe('1-true-sync');
    await expect(promisifiedAsync(2, false, 'async')).resolves.toBe('2-false-async');
  });

  it('should handle functions with no arguments', async () => {
    const syncNoArg = () => 'no args sync';
    const asyncNoArg = async () => {
       await new Promise(res => setTimeout(res, 5));
       return 'no args async';
    };

    const promisifiedSync = promisify(syncNoArg);
    const promisifiedAsync = promisify(asyncNoArg);

    await expect(promisifiedSync()).resolves.toBe('no args sync');
    await expect(promisifiedAsync()).resolves.toBe('no args async');
  });

  it('should call the function with the context it was called with (if context is implicitly managed)', async () => {
    const obj = {
      value: 'object context',
      syncMethod: promisify(function(this: { value: string }) {
        return this.value;
      }),
      asyncMethod: promisify(async function (this: { value: string }) {
        await new Promise(res => setTimeout(res, 5));
        return this.value;
      }),
    };

    await expect(obj.syncMethod()).resolves.toBe('object context');
    await expect(obj.asyncMethod()).resolves.toBe('object context');
  });
});
