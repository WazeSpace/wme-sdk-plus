import { ClosureAttributes } from './Closure.js';
import { DataModel } from './DataModel.js';

interface RoadClosureAttributes extends ClosureAttributes {
  closureType: 'SEGMENT';
  segID: number;
  forward: boolean;
  fromNodeClosed: boolean;
}
export interface RoadClosure extends DataModel<RoadClosureAttributes> {
  type: 'roadClosure';
}
