export type DefaultDataModelPermissionFlags = 'DELETE' | 'EDIT_PROPERTIES';

export interface DataModelAttributes<I = number | string> {
  id: I;
  createdBy: number;
  createdOn: number;
  updatedBy: number;
  updatedOn: number;
  permissions: number;
}

export interface DataModel<
  A extends DataModelAttributes = DataModelAttributes,
  PK extends string | number | symbol = DefaultDataModelPermissionFlags,
> {
  attributes: A;
  type: string;
  model: any;
  state: null | 'INSERT' | 'DELETE' | 'UPDATE';
  permissionFlags: Record<PK, number>;

  isAllowed(permission: number): boolean;
  getAttribute<N extends keyof A>(attributeName: N): A[N];
  getUniqueIdentifier(): { objectId: A['id']; objectType: string };
  getUniqueID(): string;
}

export type ExtractAttributesFromDataModel<T> =
  T extends DataModel<infer U> ? U : never;
