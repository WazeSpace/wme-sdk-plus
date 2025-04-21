import { Geometry } from 'geojson';
import { Action } from '../../../@wme-typings/Waze/actions/action.js';
import { WmeRepositoryName } from '../constants/wme-repository-names.js';

export interface LegacySaveResponse {
  pendingEdits: null | unknown;
  saveCount: {
    bigJunctions: number;
    nodes: number;
    segments: number;
    venues: number;
  };
  unsavedFeatures: unknown[];
}
export type SaveResponse = {
  [K in WmeRepositoryName | 'connections']?: object;
} & {
  status: number;
  synced: boolean;
  unsavedFeatures: {
    [K in WmeRepositoryName]?: {
      [K: string]: {
        errorLevel: 'ERROR' | 'WARNING';
        errorList: Array<{
          code: number;
          details: string;
        }>;
        geometry: Geometry;
        objects: Array<{ id: string, objectType: string }>;
      }
    }
  }
}

export interface WmeAppController {
  save(options?: {
    actions?: Array<Action>
  }): Promise<LegacySaveResponse | SaveResponse>;

  model: any;
}
