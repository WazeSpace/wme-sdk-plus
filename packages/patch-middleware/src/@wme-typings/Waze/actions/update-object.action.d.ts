import { Action } from '@/@waze/Waze/actions/action';
import {
  DataModel,
  ExtractAttributesFromDataModel,
} from '@/@waze/Waze/DataModels/DataModel';

export class UpdateObjectAction<DM extends DataModel> extends Action {
  actionName: 'UPDATE_OBJECT';
  object: DM;

  constructor(
    object: DM,
    newAttributes: Partial<ExtractAttributesFromDataModel<DM>>,
    props: unknown,
  );

  getNewAttributes(): Record<string, any>;
  getOldAttributes(): Record<string, any>;
  getObject(): DM;
}
export function isUpdateObjectAction<DM extends DataModel = DataModel>(
  action: Action,
): action is UpdateObjectAction<DM>;
