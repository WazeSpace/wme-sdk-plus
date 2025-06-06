import { WmeSDK } from 'wme-sdk-typings';
import { SdkPatcherRule } from './rules/index.js';
import { ARTIFACTS } from './consts.js';

export class SdkPatcher {
  private _recognizableHooks = new Map<string, SdkPatcherRule[]>();
  private _hookDependencies = new Map<string, string[]>();
  private _installedHooks = new Map<WmeSDK, SdkPatcherRule[][]>;

  constructor(hooks: Record<string, { hook: SdkPatcherRule[], deps?: string[] }>) {
    for (const [name, { hook, deps }] of Object.entries(hooks)) {
      this._recognizableHooks.set(name, hook);
      if (deps) this._hookDependencies.set(name, deps || []);
    }
  }

  private isHookInstalled(sdk: WmeSDK, name: string) {
    const hook = this._recognizableHooks.get(name);
    if (!hook) return false;
    if (!this._installedHooks.has(sdk)) return false;

    const hooks = this._installedHooks.get(sdk);
    if (!hooks) return false;

    return hooks.some(h => h === hook);
  }

  private markHookAsInstalled(sdk: WmeSDK, name: string) {
    const hook = this._recognizableHooks.get(name);
    if (!hook) throw new Error(`Hook ${name} not found`);
    if (!this._installedHooks.has(sdk)) this._installedHooks.set(sdk, []);

    this._installedHooks.get(sdk)?.push(hook);
  }

  async installHook(name: string, sdk: WmeSDK) {
    const hook = this._recognizableHooks.get(name);
    if (!hook) throw new Error(`Hook ${name} not found`);
    if (this.isHookInstalled(sdk, name)) return;

    const deps = this._hookDependencies.get(name) || [];
    for (const dep of deps) {
      // install dependencies first, recursively
      await this.installHook(dep, sdk);
    }

    const artifacts = Reflect.getMetadata(ARTIFACTS, sdk) || {};
    if (!Reflect.hasMetadata(ARTIFACTS, sdk)) {
      Reflect.defineMetadata(ARTIFACTS, artifacts, sdk);
    }

    for (const rule of hook) {
      if (typeof rule === 'function') {
        await rule({ sdk, artifacts });
        continue;
      }

      const newArtifacts = await rule.install({ sdk, artifacts });
      if (!newArtifacts || typeof newArtifacts !== 'object') continue;
      Object.assign(artifacts, newArtifacts);
    }
    this.markHookAsInstalled(sdk, name);
  }

  async installAllHooks(sdk: WmeSDK) {
    for (const name of this._recognizableHooks.keys()) {
      await this.installHook(name, sdk);
    }
  }
}
