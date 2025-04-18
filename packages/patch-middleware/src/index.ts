/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DefinePropertyRule,
  SdkPatcherRule,
} from '@wme-enhanced-sdk/sdk-patcher';
import { MiddlewareRegistry } from './lib/middleware-registry.js';
import { REGISTRY_ARTIFACT } from './consts.js';
import updateRequests_addComment_middleware from './middlewares/updateRequests/addComment.js';
import closures_save_middleware from './middlewares/closures/save.js';
import { MiddlewareHandler } from './lib/middleware-handler.js';

export default [
  {
    install: ({ sdk }) => {
      return {
        [REGISTRY_ARTIFACT]: new MiddlewareRegistry(sdk),
      };
    },
  } as SdkPatcherRule,
  new DefinePropertyRule(
    'Events.registerMiddleware',
    ({ artifacts }: any) =>
      (actionPoint: string, handler: MiddlewareHandler<any, any>) => {
        const registry: MiddlewareRegistry = artifacts[REGISTRY_ARTIFACT];
        return registry?.register(actionPoint, handler);
      },
    { isFactory: true }
  ),
  updateRequests_addComment_middleware,
  ...closures_save_middleware,
];
