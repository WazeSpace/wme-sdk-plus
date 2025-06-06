import { Selection } from 'wme-sdk-typings';

export function compareSelection(a: Selection | null, b: Selection | null): boolean {
  if (!a || !b) return a === b;
  if (a.objectType !== b.objectType) return false;

  // clone the arrays for immutability
  const aIds = [...a.ids];
  const bIds = [...b.ids];

  // if the length differs, then we're handling different sets
  if (aIds.length !== bIds.length) return false;

  // sort the arrays to ensure we can compare them one-by-one
  aIds.sort();
  bIds.sort();

  // compare every item in array A against the item with the same index on B
  return aIds.every((aId, index) => {
    const bId = bIds[index];
    return aId === bId;
  })
}
