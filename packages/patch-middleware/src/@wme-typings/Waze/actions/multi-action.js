export function isMultiAction(action) {
  return 'subActions' in action && Array.isArray(action.subActions);
}
