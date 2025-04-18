import { Action } from '../../../@wme-typings/Waze/actions/action.js';

export interface WmeAppController {
  save(options?: {
    actions?: Array<Action>
  }): Promise<{
    pendingEdits: null | unknown;
    saveCount: {
      bigJunctions: number;
      nodes: number;
      segments: number;
      venues: number;
    };
    unsavedFeatures: unknown[];
  }>;

  model: any;
}
