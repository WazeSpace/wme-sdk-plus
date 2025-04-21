export function deepMerge<T>(target: T, source: Partial<T>): T {
  if (typeof target !== 'object' || target === null) {
    return source as T;
  }

  if (Array.isArray(target) && Array.isArray(source)) {
    return [...target, ...(source as any)] as any;
  }

  const merged = { ...target };

  for (const key in source) {
    if (source[key] === undefined) continue;

    if (key in merged && typeof merged[key] === 'object') {
      merged[key] = deepMerge(merged[key], source[key] as any);
    } else {
      (merged[key] as any) = source[key];
    }
  }

  return merged;
}
