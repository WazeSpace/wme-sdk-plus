import { TurnClosure as WmeTurnClosure } from '../../../@wme-typings/Waze/DataModels/TurnClosure.js';
import { RoadClosure as WmeRoadClosure } from '../../../@wme-typings/Waze/DataModels/RoadClosure.js';
import { Closure, SegmentClosure, TurnClosure } from '../interfaces/index.js';

const WME_TYPE_TO_MIDDLEWARE: Record<(WmeRoadClosure | WmeTurnClosure)['type'], (SegmentClosure | TurnClosure)['closureType']> = {
  roadClosure: 'SEGMENT',
  turnClosure: 'TURN',
};

export function wmeClosureToMiddlewareClosure(closure: WmeRoadClosure): SegmentClosure;
export function wmeClosureToMiddlewareClosure(closure: WmeTurnClosure): TurnClosure;
export function wmeClosureToMiddlewareClosure(
  closure: WmeRoadClosure | WmeTurnClosure,
): SegmentClosure | TurnClosure {
  const commonData: Closure = {
    id: closure.state === 'INSERT' ? null : closure.attributes.id,
    closureType: WME_TYPE_TO_MIDDLEWARE[closure.type],
    startDate: new Date(closure.attributes.startDate),
    endDate: new Date(closure.attributes.endDate),
    description: closure.attributes.reason,
    eventId: closure.attributes.eventId,
  };

  switch (closure.type) {
    case 'roadClosure':
      return {
        ...commonData,
        closureType: 'SEGMENT',
        permanent: closure.getAttribute('permanent'),
        segmentId: closure.getAttribute('segID'),
        forward: closure.getAttribute('forward'),
        nodeClousre: closure.getAttribute('fromNodeClosed'),
        provider: closure.getAttribute('provider'),
      };
    case 'turnClosure':
      return {
        ...commonData,
        closureType: 'TURN',
        permanent: true,
        fromSegmentId: closure.getAttribute('fromSegID'),
        fromSegmentForward: closure.getAttribute('fromSegForward'),
        toSegmentId: closure.getAttribute('toSegID'),
        toSegmentForward: closure.getAttribute('toSegForward'),
        nodeId: closure.getAttribute('nodeConnID'),
      }
  }
}

