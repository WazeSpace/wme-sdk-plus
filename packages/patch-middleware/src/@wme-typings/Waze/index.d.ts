import UserScripts from './UserScripts.js';

export default interface Waze {
  Config: any;
  Rule(): any; // todo inspect this function
  accelerators: any;
  app: any; // TODO
  changesLogController: any; // TODO
  commands: any; // TODO
  controller: any; // TODO
  editingMediator: any; // TODO
  layerSwitchController: any; // TODO
  loginManager: any; // TODO
  map: any; // TODO
  model: any; // TODO
  prefs: any; // TODO
  reqres: any; // TODO
  saveController: any; // TODO
  selectionManager: any; // TODO
  snapshotManager: any; // TODO
  streetViewController: any; // TODO
  togglerTree: any; // TODO
  vent: any; // TODO
  version: string;
  userscripts: UserScripts;
}
// declare var W: Waze;
