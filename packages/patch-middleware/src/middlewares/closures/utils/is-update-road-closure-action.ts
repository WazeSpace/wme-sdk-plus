import { UpdateObjectAction } from '../../../@wme-typings/Waze/actions/update-object.action.js';
import { RoadClosure } from '../../../@wme-typings/Waze/DataModels/RoadClosure.js';

export type UpdateRoadClosureAction = UpdateObjectAction<RoadClosure>;
/* eslint-disable @typescript-eslint/no-explicit-any */
export function isUpdateRoadClosureAction(action: any): action is UpdateRoadClosureAction {
  return isUpdateRoadClosureAction(action) && action.object.type === 'roadClosure';
}
