import { Closure } from './closure.js';

export interface TurnClosure extends Closure {
  closureType: 'TURN';

  /** Indicates if the closure is permanent (won’t auto-open). */
  permanent: true;

  /** ID of the segment entering the turn */
  fromSegmentId: number;

  /** Indicates the travel direction on the segment entering the turn */
  fromSegmentForward: boolean;

  /** ID of the segment leaving the turn */
  toSegmentId: number;

  /** Indicates the travel direction on the segment leaving the turn */
  toSegmentForward: boolean;

  /**
   * Specifies the exact node through which this closure applies.
   * 
   * For turns in junction boxes, this must be set to 0.
   */
  nodeId: number;
}
