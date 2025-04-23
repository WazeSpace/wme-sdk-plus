import { TurnClosure } from '../../../@wme-typings/Waze/DataModels/TurnClosure.js';
import { isUpdateObjectAction, UpdateObjectAction } from '../../../@wme-typings/Waze/actions/update-object.action.js';

export type UpdateTurnClosureAction = UpdateObjectAction<TurnClosure>;
/* eslint-disable @typescript-eslint/no-explicit-any */
export function isUpdateTurnClosureAction(action: any): action is UpdateTurnClosureAction {
  return isUpdateObjectAction(action) && action.object?.type === 'turnClosure';
}
