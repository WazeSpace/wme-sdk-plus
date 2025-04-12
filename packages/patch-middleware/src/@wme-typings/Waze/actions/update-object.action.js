import { getWazeMapEditorWindow } from '../../../utils/get-wme-window';

export const UpdateObjectAction = getWazeMapEditorWindow().require(
  'Waze/Action/UpdateObject',
);

export function isDeleteObjectAction(action) {
  return action.actionName === 'UPDATE_OBJECT';
}

