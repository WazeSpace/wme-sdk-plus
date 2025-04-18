import { Action } from 'src/@wme-typings/Waze/actions/action.js';
import { isAddRoadClosureAction } from './is-add-road-closure-action.js';
import { isAddTurnClosureAction } from './is-add-turn-closure-action.js';
import { isDeleteRoadClosureAction } from './is-delete-road-closure-action.js';
import { isDeleteTurnClosureAction } from './is-delete-turn-closure-action.js';
import { isUpdateRoadClosureAction } from './is-update-road-closure-action.js';
import { isUpdateTurnClosureAction } from './is-update-turn-closure-action.js';

export type AnyClosureAction = ReturnType<typeof getAllClosureActions>[number];

export function getAllClosureActions(actions: Action[]) {
  return actions.filter((action) => {
    return (
      isAddRoadClosureAction(action) || isAddTurnClosureAction(action) ||
      isUpdateRoadClosureAction(action) || isUpdateTurnClosureAction(action) ||
      isDeleteRoadClosureAction(action) || isDeleteTurnClosureAction(action)
    );
  });
}
