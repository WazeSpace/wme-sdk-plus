import { getWindow } from '@wme-enhanced-sdk/utils';

export const MultiAction = getWindow().require(
  'Waze/Action/MultiAction',
);
MultiAction.Base = MultiAction.__proto__;

export function isMultiAction(action) {
  return 'subActions' in action && Array.isArray(action.subActions);
}
