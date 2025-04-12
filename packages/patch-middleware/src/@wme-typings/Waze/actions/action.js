import { getWazeMapEditorWindow } from '@/utils/get-wme-window';

export const Action = getWazeMapEditorWindow().require(
  'Waze/Action/UpdateObject',
).__proto__;
