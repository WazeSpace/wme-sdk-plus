/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteObjectAction, isDeleteObjectAction } from '../../../@wme-typings/Waze/actions/delete-object.action.js';
import { TurnClosure } from '../../../@wme-typings/Waze/DataModels/TurnClosure.js';

export type DeleteTurnClosureAction = DeleteObjectAction<TurnClosure>;
export function isDeleteTurnClosureAction(action: any): action is DeleteTurnClosureAction {
  return isDeleteObjectAction(action) && action.object.type === 'turnClosure';
}
