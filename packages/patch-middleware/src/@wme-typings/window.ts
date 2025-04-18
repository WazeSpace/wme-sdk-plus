/* eslint-disable @typescript-eslint/no-explicit-any */
export type WmeWindow = Window & {
  I18n: import('./I18n.js').default;
  W: import('./Waze/index.js').default;
  $: any;
  OpenLayers: any;
  require: (
    module:
      | 'Waze/Action/AddAlternateStreet'
      | 'Waze/Action/AddIntersection'
      | 'Waze/Action/AddLandmark'
      | 'Waze/Action/AddNode'
      | 'Waze/Action/AddOrGetCity'
      | 'Waze/Action/AddOrGetStreet'
      | 'Waze/Action/AddSegment'
      | 'Waze/Action/ConnectSegment'
      | 'Waze/Action/CreateObject'
      | 'Waze/Action/CreateRoundabout'
      | 'Waze/Action/DeleteObject'
      | 'Waze/Action/DeleteSegment'
      | 'Waze/Action/DisconnectSegment'
      | 'Waze/Action/MergeSegments'
      | 'Waze/Action/ModifyAllConnections'
      | 'Waze/Action/MoveNode'
      | 'Waze/Action/MultiAction'
      | 'Waze/Action/SplitSegments'
      | 'Waze/Action/UpdateFeatureAddress'
      | 'Waze/Action/UpdateFeatureGeometry'
      | 'Waze/Action/UpdateHouseNumber'
      | 'Waze/Action/MoveHouseNumber'
      | 'Waze/Actions/AddHouseNumber'
      | 'Waze/Actions/DeleteHouseNumber'
      | 'Waze/Actions/ReplaceHouseNumberSegment'
      | 'Waze/Actions/MoveHouseNumberFractionPoint'
      | 'Waze/Action/UpdateObject'
      | 'Waze/Action/UpdatePlaceUpdate'
      | 'Waze/Action/UpdateSegmentGeometry'
      | 'Waze/DivIcon'
      | 'Waze/Feature/Vector/Landmark'
      | 'Waze/Feature/Vector/Segment'
      | 'Waze/Feature/Vector/UpdateRequest'
      | 'Waze/Handler/DragElement'
      | 'Waze/Model/Graph/Actions/SetTurn'
      | 'Waze/Model/Graph/TurnData'
      | 'Waze/Model/Graph/TurnGraph'
      | 'Waze/Model/Graph/Vertex'
      | 'Waze/Model/Objects/OpeningHour'
      | 'Waze/Modules/Closures/Models/ClosureActionBuilder'
      | 'Waze/Modules/Closures/Models/SharedClosure',
  ) => any;
  webpackChunkeditor: any;
};
