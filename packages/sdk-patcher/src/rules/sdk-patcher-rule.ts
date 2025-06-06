import { WmeSDK } from 'wme-sdk-typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Artifacts = Record<symbol | string, any>;

export interface SdkPatcherRuleOperationArgs {
  sdk: WmeSDK;
  artifacts: Artifacts;
}

interface SdkPatcherRuleObject {
  install(args: SdkPatcherRuleOperationArgs): void | Artifacts | Promise<void | Artifacts>;
  uninstall?(args: SdkPatcherRuleOperationArgs): void | Artifacts | Promise<void | Artifacts>;
}

type SdkPatcherRuleDestructor = () => void | Promise<void>;
type SdkPatcherRuleFn = (args: SdkPatcherRuleOperationArgs) => void | Promise<void> | SdkPatcherRuleDestructor;

export type SdkPatcherRule = SdkPatcherRuleObject | SdkPatcherRuleFn;
