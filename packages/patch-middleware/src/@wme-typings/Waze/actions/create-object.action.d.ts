import { Action } from '@/@waze/Waze/actions/action';
import { DataModel } from '@/@waze/Waze/DataModels/DataModel';

export class CreateObjectAction<
  DM extends DataModel = DataModel,
  AN = 'CREATE_OBJECT',
> extends Action {
  actionName: AN;

  object: DM;
  repository: any;
  attributes: DM extends DataModel<infer U> ? U : never;

  constructor(object: DM, repository: any, attributes?: any, props?: any);

  getObject(): DM;
  getAttributes(): typeof this.attributes;
  setAttributes(newAttributes: Partial<typeof this.attributes>): void;
}

export function isCreateObjectAction<DM extends DataModel = DataModel>(
  action: Action,
): action is CreateObjectAction<DM>;
