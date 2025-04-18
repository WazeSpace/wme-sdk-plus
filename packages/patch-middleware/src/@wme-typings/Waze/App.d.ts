import { EventHandler } from './EventsRepo.js';

interface Attributes {
  editing: boolean;
  featureSelected: boolean;
  feedFilter: import('./FeedFilter.js').FeedFilter;
  isFeedFilterOpen: boolean;
  lastMapIssuesBbox: any; // todo inspect (i got null)
  loading: boolean;
  loadingFeatures: boolean;
  loadingFeedMapData: boolean;
  loggedIn: boolean;
  modeSwitcherState: number;
  sandbox: boolean;
  sessionExpired: boolean;
  user: import('./Feature/Vector/User.js').default;
}

interface Listener {
  count: number;
  id: string;
  listeningTo: {
    [key: number]: Listener;
  };
  obj: App;
  objId: string;
}

export default class App {
  attributes: Attributes;
  changed: { loadingFeatures: boolean };
  cid: string;
  feedModel: import('./Model/index.js').FeedModel;
  layout: import('./Layout/index.js').default;
  notificationsBoxState: NotificationsBoxState;
  trigger: (d: any) => any; // todo inspect this function
  _changing: boolean;
  _events: {
    [key: string]: Array<EventHandler<any>>; // todo inspect the context type
  };
  _listenId: string;
  _listeners: { [key: number]: Listener };
  _pending: boolean;
  _previousAttributes: Attributes;
  _urlParams: { env: string; lat: string; lon: string; zoom: string };

  activateSandboxMode(): void;
  changeAppLocale(locale: string): void; // todo probably the parameter is locale of type string and returns void
  changeAppRegion(region: string): void; // todo probably the parameter is region of type string and returns void
  defaults(): Attributes; // todo Copilot suggested that this is a function that returns an Attributes object, seems like true
  disableSandboxMode(): void;
  exitSnapshotMode(): void;
  getAppRegionCode(): string;
  getNotificationBoxState(): any; // todo inspect this function
  initializeUI(): void;
  isEditingMode(): boolean;
  isLoggedIn(): boolean;
  isSandboxMode(): boolean;
  restoreFeedFilter(): any; // todo inspect this function, i'm not sure if the function returns something
  saveFeedFilter(): any; // todo inspect this function, i'm not sure if the function returns something
  shouldBlockExit(): boolean;
  start(e: any): any; // todo inspect this function
  _moveToFamiliarLocation(e: any): any; // todo inspect this function
  _onBeforeUnload(e: any): any; // todo inspect this function
  _onLoginChanged(): any; // todo inspect this function
  _onLogout(): any; // todo inspect this function
  _onSessionExpired(): any; // todo inspect this function
  _processRelogin(): any; // todo inspect this function
  _restoreSnapshotState(): any; // todo inspect this function
  _setAnalyticsContext(): any; // todo inspect this function
  _setEditing(): any; // todo inspect this function
  _setLoggedInUser(): any; // todo inspect this function
  _setSandboxMode(e: any): any; // todo inspect this function
  _setSessionExpired(e: any): any; // todo inspect this function
  _setupBindings(): any; // todo inspect this function
  _setupLoginManager(e: any): any; // todo inspect this function
  bind(e: any, t: any, n: any): any; // todo inspect this function
  chain(): any; // todo inspect this function
  changedAttributes(e: any): any; // todo inspect this function
  cidPrefix: string;
  clear(e: any): any; // todo inspect this function
  clone(): any; // todo inspect this function
  destroy(e: any): any; // todo inspect this function
  escape(e: any): any; // todo inspect this function
  fetch(e: any): any; // todo inspect this function
  get(e: any): any; // todo inspect this function
  has(e: any): boolean; // todo inspect this function, probably the return type is boolean
  hasChanged(e: any): boolean; // todo inspect this function, probably the return type is boolean
  idAttribute: string;
  initialize(): any; // todo inspect this function
  invert(): any; // todo inspect this function
  isEmpty(): boolean; // todo inspect this function, probably the return type is boolean
  isNew(): boolean; // todo inspect this function, probably the return type is boolean
  isValid(e: any): boolean; // todo inspect this function, probably the return type is boolean
  keys(): any; // todo inspect this function, probably the return type should be an array
  listenTo(e: any, t: any, r: any): any; // todo inspect this function
  listenToOnce(e: any, t: any, r: any): any; // todo inspect this function
  matches(e: any): boolean; // todo inspect this function, probably the return type is boolean
  off(e: any, t: any, n: any): any; // todo inspect this function
  omit(e: any): any; // todo inspect this function
  on(e: any, t: any, n: any): any; // todo inspect this function
  once(e: any, t: any, r: any): any; // todo inspect this function
  pairs(): any; // todo inspect this function, probably the return type should be an array
  parse(e: any, t: any): any; // todo inspect this function
  pick(): any; // todo inspect this function
  previous(e: any): any; // todo inspect this function
  previousAttributes(): Attributes; // todo inspect this function, probably the return type should be an Attributes object
  save(e: any, t: any, r: any): any; // todo inspect this function
  set(e: any, t: any, r: any): any; // todo inspect this function
  stopListening(e: any, t: any, r: any): any; // todo inspect this function
  sync(): any; // todo inspect this function
  toJSON(): any; // todo inspect this function
  unbind(e: any, t: any, n: any): any; // todo inspect this function
  unset(e: any, t: any): any; // todo inspect this function
  url(): any; // todo inspect this function
  validationError: any; // todo inspect
  values(): any; // todo inspect this function, probably the return type should be an Attributes object (copilot suggestion)
  _validate(e: any, t: any): any; // todo inspect this function
}
