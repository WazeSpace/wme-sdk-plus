import { DataModel, DataModelAttributes } from './DataModel.js';

export type ClosureStatus = 'ACTIVE' | 'FAILED' | 'FINISHED' | 'FINISHED_EARLY_DUE_TO_DELETION' | 'FINISHED_EARLY_DUE_TO_OVERLAPPING_CLOSURES' | 'UNVERIFIED';

export interface ClosureAttributes extends DataModelAttributes<string> {
  attributions: Array<{
    channel: string;
    contributionTime: number;
    credit: unknown;
    feedId: unknown;
    idInProvider: unknown;
    partnerId: unknown;
    userChannel: string;
  }> | null;

  closureStatus?: ClosureStatus;
  closureStatusHistory?: Array<{
    closureStatus: ClosureStatus;
    changeDate: string;
  }>;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
  closureType: string;
  permanent: boolean;
  reason: string;

  startDate: string;
  endDate: string;
  eventId: string;

  externalProvider: unknown;
  externalProviderId: unknown;
  provider: string | null;
}
export type Closure = DataModel<ClosureAttributes>;
