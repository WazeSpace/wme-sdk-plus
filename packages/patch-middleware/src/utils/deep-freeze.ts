export type DeepFrozen<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepFrozen<T[K]>
    : T[K];
}

export function deepFreeze<T>(obj: T): DeepFrozen<T> {
  // Freeze the object itself
  Object.freeze(obj);

  // Recursively freeze properties that are objects
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value && typeof value === 'object') {
        deepFreeze(value);
      }
    }
  }

  return obj;
}
