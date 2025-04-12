import { getWazeMapEditorWindow } from '../../../utils/get-wme-window';

export const CreateObjectAction = getWazeMapEditorWindow().require(
  'Waze/Action/CreateObject',
);

export function isCreateObjectAction(action) {
  return action.actionName === 'CREATE_OBJECT';
}
