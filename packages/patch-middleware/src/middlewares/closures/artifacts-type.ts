import { RoadClosure } from '../../@wme-typings/Waze/DataModels/RoadClosure.js'
import { TurnClosure } from '../../@wme-typings/Waze/DataModels/TurnClosure.js'
import { ROAD_CLOSURE_ARTIFACT, TURN_CLOSURE_ARTIFACT } from './consts.js'

export type Artifacts = {
  [ROAD_CLOSURE_ARTIFACT]: new(attributes: RoadClosure['attributes']) => RoadClosure;
  [TURN_CLOSURE_ARTIFACT]: new(attributes: TurnClosure['attributes']) => TurnClosure;
}
