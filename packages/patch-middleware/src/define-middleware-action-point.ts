import { SdkPatcherRule, SdkPatcherRuleOperationArgs } from '@wme-enhanced-sdk/sdk-patcher';
import { MiddlewareRegistry } from './lib/middleware-registry.js';
import { REGISTRY_ARTIFACT } from './consts.js';

export interface DefineMiddlewareActionPointRuleOptions<D extends object> {
  actionPoint: string;
  install: (triggerMiddlewares: (data: D) => Promise<D>) => ((() => void) | void);
  registryArtifactName?: string | symbol;
}
export class DefineMiddlewareActionPointRule<D extends object> implements SdkPatcherRule {
  private isMiddlewareDefined = false;
  private uninstaller: (() => void) | null = null;
  private registry?: MiddlewareRegistry;

  constructor(private readonly options: DefineMiddlewareActionPointRuleOptions<D>) {}

  private addRegistryEvents() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.registry?.addEventListener('middlewareRegistered', this.handleMiddlewareRegistered as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.registry?.addEventListener('middlewareUnregistered', this.handleMiddlewareUnregistered as any);
  }

  private removeRegistryEvents() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.registry?.removeEventListener('middlewareRegistered', this.handleMiddlewareRegistered as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.registry?.removeEventListener('middlewareUnregistered', this.handleMiddlewareUnregistered as any);
  }

  private defineMiddleware() {
    if (this.isMiddlewareDefined) return;
    this.uninstaller = this.options.install((data) => {
      return new Promise((resolve) => {
        if (!this.registry) return resolve(data);
        this.registry.execute(this.options.actionPoint, data, resolve);
      });
    }) || null;
    this.isMiddlewareDefined = true;
  }

  private undefineMiddleware() {
    if (!this.isMiddlewareDefined) return;
    this.uninstaller?.();
    this.isMiddlewareDefined = false;
  }

  private handleMiddlewareRegistered = (event: CustomEvent<{ actionPoint: string }>) => {
    if (event.detail.actionPoint !== this.options.actionPoint) return;
    this.defineMiddleware();
  }

  private handleMiddlewareUnregistered = (event: CustomEvent<{ actionPoint: string }>) => {
    if (event.detail.actionPoint !== this.options.actionPoint) return;
    if (this.registry?.hasListeners(this.options.actionPoint)) return;
    this.undefineMiddleware();
  }

  install({ artifacts }: SdkPatcherRuleOperationArgs) {
    this.registry = artifacts[this.options.registryArtifactName ?? REGISTRY_ARTIFACT];
    if (this.registry?.hasListeners(this.options.actionPoint)) this.defineMiddleware();
    this.addRegistryEvents();
  }
  uninstall() {
    this.removeRegistryEvents();
    this.undefineMiddleware();
    this.registry = undefined;
  }
}
