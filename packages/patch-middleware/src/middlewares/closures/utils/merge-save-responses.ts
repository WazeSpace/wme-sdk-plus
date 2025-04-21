import { WME_REPOSITORY_NAMES } from '../constants/wme-repository-names.js';
import { LegacySaveResponse, SaveResponse } from '../interfaces/index.js';
import { deepMerge } from './deep-merge.js';

export function mergeSaveResponses(
  a: LegacySaveResponse | SaveResponse,
  b: LegacySaveResponse | SaveResponse,
): LegacySaveResponse | SaveResponse {
  const isALegacy = isLegacySaveResponse(a);
  const isBLegacy = isLegacySaveResponse(b);

  if (isALegacy && isBLegacy) {
    return {
      pendingEdits: a.pendingEdits || b.pendingEdits,
      saveCount: {
        bigJunctions: a.saveCount.bigJunctions + b.saveCount.bigJunctions,
        nodes: a.saveCount.nodes + b.saveCount.nodes,
        segments: a.saveCount.segments + b.saveCount.segments,
        venues: a.saveCount.venues + b.saveCount.venues,
      },
      unsavedFeatures: [...a.unsavedFeatures, ...b.unsavedFeatures],
    };
  }

  if (!isALegacy && !isBLegacy) {
    const repositoriesData = [...WME_REPOSITORY_NAMES, 'connections'].reduce((acc, repoName) => {
      const aRepo = a[repoName as keyof typeof a] as any;
      const bRepo = b[repoName as keyof typeof b] as any;

      if (aRepo && bRepo) {
        acc[repoName] = deepMerge(aRepo, bRepo);
      } else if (aRepo) {
        acc[repoName] = aRepo;
      } else if (bRepo) {
        acc[repoName] = bRepo;
      }

      return acc;
    }, {} as Record<string, any>);

    return {
      ...repositoriesData,
      status: a.status,
      synced: a.synced,
      unsavedFeatures: deepMerge(a.unsavedFeatures, b.unsavedFeatures),
    };
  }

  throw new ResponseVersionMismatchError(a, b);
}

function isLegacySaveResponse(
  response: LegacySaveResponse | SaveResponse,
): response is LegacySaveResponse {
  return 'saveCount' in response;
}

export class ResponseVersionMismatchError extends Error {
  constructor(
    public a: LegacySaveResponse | SaveResponse,
    public b: LegacySaveResponse | SaveResponse,
  ) {
    super('Responses have different versions');
  }

  get preferredResponse(): SaveResponse {
    if (isLegacySaveResponse(this.a)) return this.b as SaveResponse;
    return this.a as SaveResponse;
  }
}
