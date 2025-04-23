import { Closure } from './closure.js';

export interface SegmentClosure extends Closure {
  closureType: 'SEGMENT';

  /** ID of the road segment */
  segmentId: number;

  /** Indicates whether the closure affects the “forward” direction (A → B) of the segment */
  forward: boolean;

  /**
   * Indicates whether the node before the closure (for “forward” direction closures, it’s node A; for “reverse” direction closures, it’s node B).
   */
  nodeClosure: boolean;

  /** Indicates if the closure is permanent (won’t auto-open). */
  permanent: boolean;

  /** If specified, indicates the name of the partner provider as they’re registered in the partner hub. */
  provider: string | null | undefined;
}
