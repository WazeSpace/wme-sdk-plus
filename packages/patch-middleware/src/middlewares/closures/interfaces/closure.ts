export interface Closure {
  /**
   * If present, indicates an existing closure for update; otherwise, a new closure to create.
   * 
   * For deletion actions, this must be presented.
   */
  id: string | null | undefined;

  /** Identifies the closure type */
  closureType: string;

  /** Description of the closure */
  description: string;

  /** Start date of the closure */
  startDate: Date;

  /** End date of the closure */
  endDate: Date;

  /** If provided, associates the closure with a specific major traffic event by its ID */
  eventId?: string;
}

export type ClosureToDelete<C extends Closure> = Required<Pick<C, 'id' | 'closureType'>>;
