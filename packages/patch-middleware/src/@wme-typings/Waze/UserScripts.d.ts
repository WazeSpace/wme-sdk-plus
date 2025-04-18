import { Geometry } from '@turf/helpers';

interface WmeState {
  isInitialMapDataLoaded: boolean; // if `wme-map-data-loaded` has already been dispatched
  isInitialized: boolean; // if `wme-initialzied` has already been dispatched
  isReady: boolean; // if `wme-ready` has already been dispatched
}

interface RegisterSidebarTabResult {
  tabLabel: HTMLElement;
  tabPane: HTMLElement;
}

export default interface UserScripts {
  readonly state: Readonly<WmeState>;
  registerSidebarTab(scriptId: string): RegisterSidebarTabResult;
  waitForElementConnected(el: HTMLElement): Promise<void>;
  removeSidebarTab(scriptId: string): void;
  toGeoJSONGeometry<G extends Geometry = Geometry>(openLayersGeometry: any): G;
  toOLGeometry(geometry: Geometry): any;
}
