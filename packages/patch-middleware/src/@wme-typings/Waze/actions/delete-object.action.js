import { getWindow } from '@wme-enhanced-sdk/utils';

export const DeleteObjectAction = getWindow().require(
  'Waze/Action/DeleteObject',
);

export function isDeleteObjectAction(action) {
  return action.actionName === 'DELETE_OBJECT';
}
