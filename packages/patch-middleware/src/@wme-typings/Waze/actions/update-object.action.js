import { getWindow } from '@wme-enhanced-sdk/utils';

export const UpdateObjectAction = getWindow().require(
  'Waze/Action/UpdateObject',
);

export function isUpdateObjectAction(action) {
  return action.actionName === 'UPDATE_OBJECT';
}

