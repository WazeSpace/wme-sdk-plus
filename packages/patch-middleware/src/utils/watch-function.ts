// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function watchFunction<T extends (...args: any[]) => any>(
  fn: T,
): [function: T, isCalled: () => boolean, latestResult: () => ReturnType<T>] {
  let called = false, latestResult: (ReturnType<T> | null) = null;
  const isCalled = () => called;
  const onCall = () => called = true;
  const getLatestResult = () => {
    if (!called) {
      throw new Error('Function has not been called yet');
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return latestResult!;
  }

  const exec = function (this: ThisType<T>, ...args: Parameters<T>) {
    onCall();
    return latestResult = fn.apply(this, args);
  } as T;

  return [exec, isCalled, getLatestResult] as const;
}
