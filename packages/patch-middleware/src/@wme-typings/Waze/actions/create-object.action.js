import { getWindow } from '@wme-enhanced-sdk/utils';

export const CreateObjectAction = getWindow().require(
  'Waze/Action/CreateObject',
);

export function isCreateObjectAction(action) {
  return action.actionName === 'CREATE_OBJECT';
}
