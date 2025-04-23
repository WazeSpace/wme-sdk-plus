/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoadClosure } from '../../../@wme-typings/Waze/DataModels/RoadClosure.js';

const ACTION_NAME = 'ADD_ROAD_CLOSURE';
export interface AddRoadClosureAction {
  actionName: typeof ACTION_NAME;
  closure: RoadClosure;
  segment: any;
}
export function isAddRoadClosureAction(action: any): action is AddRoadClosureAction {
  return action?.actionName === ACTION_NAME 
    && action?.closure !== undefined 
    && action?.segment !== undefined;
}
