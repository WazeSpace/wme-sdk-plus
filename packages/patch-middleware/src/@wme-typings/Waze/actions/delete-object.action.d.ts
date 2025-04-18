import { Action } from '@/@waze/Waze/actions/action';
import { DataModel } from '@/@waze/Waze/DataModels/DataModel';

export class DeleteObjectAction<
  DM extends DataModel = DataModel,
  AN = 'DELETE_OBJECT',
> extends Action {
  actionName: AN;

  object: DM;
  repository: any;

  constructor(object: DM, repository: any, attributes?: any, props?: any);

  getObject(): DM;
}

export function isDeleteObjectAction<DM extends DataModel = DataModel>(
  action: Action,
): action is DeleteObjectAction<DM>;
