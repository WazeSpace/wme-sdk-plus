/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoadClosure } from '../../../@wme-typings/Waze/DataModels/RoadClosure.js';

const ACTION_NAME = 'DELETE_ROAD_CLOSURE';
export interface DeleteRoadClosureAction {
  actionName: typeof ACTION_NAME;
  closure: RoadClosure;
  segment: any;
}
export function isDeleteRoadClosureAction(action: any): action is DeleteRoadClosureAction {
  return action?.actionName === ACTION_NAME
    && action?.closure !== undefined 
    && action?.segment !== undefined;
}
