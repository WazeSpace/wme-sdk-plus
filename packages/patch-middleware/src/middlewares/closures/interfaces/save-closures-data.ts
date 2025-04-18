import { Closure, ClosureToDelete } from './closure.js';
import { SaveClosuresButtonSource } from './save-closures-source.js';
import { SegmentClosure } from './segment-closure.js';
import { TurnClosure } from './turn-closure.js';

export interface SaveClosuresData {
  source?: SaveClosuresButtonSource;

  closures: Array<SegmentClosure | TurnClosure | Closure>;
  deleteClosures: Array<ClosureToDelete<SegmentClosure | TurnClosure | Closure>>;
}
