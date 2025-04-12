/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateObjectAction } from '../../../@wme-typings/Waze/actions/create-object.action.js';
import { TurnClosure } from '../../../@wme-typings/Waze/DataModels/TurnClosure.js';

const ACTION_NAME = 'ADD_TURN_CLOSURE';
export type AddTurnClosureAction = CreateObjectAction<TurnClosure, typeof ACTION_NAME>;

export function isAddTurnClosureAction(action: any): action is AddTurnClosureAction {
  return action.actionName === ACTION_NAME && (action as AddTurnClosureAction).getObject()?.type === 'turnClosure';
}
