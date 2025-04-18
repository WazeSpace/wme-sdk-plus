export interface Vertex {
  segmentID: number;
  direction: 'fwd' | 'rev';

  isForward(): boolean;
  isReverse(): boolean;

  getSegmentID(): number;
  getID(): string;
  getOpposite(): Vertex;

  equals(anotherVertex: Vertex): boolean;
}
