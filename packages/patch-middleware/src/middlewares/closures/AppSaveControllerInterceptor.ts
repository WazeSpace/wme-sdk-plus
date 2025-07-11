/* eslint-disable @typescript-eslint/no-explicit-any */
import { MethodInterceptor } from '@wme-enhanced-sdk/method-interceptor';
import { LegacySaveResponse, SaveResponse, WmeAppController } from './interfaces/wme-app-controller.js';
import { Action } from '../../@wme-typings/Waze/actions/action.js';
import { isMultiAction } from '../../@wme-typings/Waze/actions/multi-action.js';
import { mergeSaveResponses } from './utils/merge-save-responses.js';

function findActionPathInList(actions: any[], actionToMatch: any | ((action: any) => boolean)): number[] | null {
  const path: number[] = [];

  if (typeof actionToMatch !== 'function') {
    const actionObject = actionToMatch;
    actionToMatch = (action: any) => actionObject === action;
  }

  for (const actionIndex in actions) {
    const action = actions[actionIndex];
    if (actionToMatch(action)) {
      return path.concat(parseInt(actionIndex));
    }

    if (action.subActions) {
      const subPath = findActionPathInList(action.subActions, actionToMatch);
      if (subPath)
        return path.concat(parseInt(actionIndex), ...subPath);
    }
  }

  return null;
}

export class SaveRequest {
  actions: Action[];

  constructor(actions: Action[]) {
    this.actions = actions;
  }

  getActionsFlat() {
    return this.actions.flatMap((action) => {
      if (isMultiAction(action)) return action.getSubActions();
      return [action];
    })
  }

  getActionPath(action: Action | ((action: Action) => boolean)): number[] | null {
    return findActionPathInList(this.actions, action);
  }

  hasAction(action: Action | ((action: Action) => boolean)): boolean {
    return this.getActionPath(action) !== null;
  }

  removeAction(path: number[]) {
    const lastPathIndex = path.pop();

    let actions = { subActions: this.actions };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    while (path.length) actions = (actions.subActions?.[path.shift()!] as any);

    if (lastPathIndex !== undefined)
      actions.subActions.splice(lastPathIndex, 1);
  }

  replaceAction(path: number[], ...actionsToInsert: Action[]) {
    const lastPathIndex = path.pop();

    let actions = { subActions: this.actions };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    while (path.length) actions = (actions.subActions?.[path.shift()!] as any);

    if (lastPathIndex !== undefined)
      actions.subActions.splice(lastPathIndex, 1, ...actionsToInsert);
  }

  addAction(action: Action) {
    this.actions.push(action);
  }
}

export class AppSaveControllerInterceptor {
  private saveInterceptor: MethodInterceptor<WmeAppController, 'save'>;

  constructor(wObject: any, fn: (request: SaveRequest) => void | Promise<void> | SaveRequest[] | Promise<SaveRequest[] | undefined>) {
    this.saveInterceptor = new MethodInterceptor(
      wObject.controller as WmeAppController,
      'save',
      async function (invoke, options, ...args) {
        const request = new SaveRequest(options?.actions || (this as WmeAppController).model.actionManager.getActions());
        const fnResult = await Promise.resolve(fn(request));

        if (fnResult) {
          let combinedResult: LegacySaveResponse | SaveResponse | null = null;

          for (const request of fnResult) {
            const result = await invoke({
              ...(options || {}),
              actions: request.actions,
            }, ...args);

            if (!combinedResult) combinedResult = result;
            else combinedResult = mergeSaveResponses(combinedResult, result);
          }
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return combinedResult!;
        }

        return invoke({
          ...(options || {}),
          actions: request.actions,
        }, ...args);
      },
    );
  }

  enable() {
    return this.saveInterceptor.enable();
  }

  disable() {
    return this.saveInterceptor.disable();
  }
}
