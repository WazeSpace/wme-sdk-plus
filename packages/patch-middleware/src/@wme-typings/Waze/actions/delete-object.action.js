import { getWazeMapEditorWindow } from '../../../utils/get-wme-window';

export const DeleteObjectAction = getWazeMapEditorWindow().require(
  'Waze/Action/DeleteObject',
);

export function isDeleteObjectAction(action) {
  return action.actionName === 'DELETE_OBJECT';
}
