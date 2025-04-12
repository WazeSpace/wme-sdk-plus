import { ClosureAttributes } from './Closure.js';
import { DataModel } from './DataModel.js';

interface TurnClosureAttributes extends ClosureAttributes {
  closureType: 'TURN';
  permanent: true;

  nodeConnID: number;

  fromSegID: number;
  fromSegForward: boolean;
  toSegID: number;
  toSegForward: boolean;
}
export interface TurnClosure extends DataModel<TurnClosureAttributes> {
  type: 'turnClosure';
}
