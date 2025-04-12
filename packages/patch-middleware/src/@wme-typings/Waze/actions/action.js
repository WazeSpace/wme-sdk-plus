import { getWindow } from '@wme-enhanced-sdk/utils'

export const Action = getWindow().require(
  'Waze/Action/UpdateObject',
).__proto__;
