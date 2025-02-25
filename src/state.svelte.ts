export const currentProfile = $state( { p: {} } );

const emptyLogs : Array<any> = [] //Todo: limit size

export const log = $state(
  { objs: emptyLogs
  });

export function pushLog(obj:any) {
  if (!obj.date) obj.date = new Date();
  log.objs.push(obj)
};

export const rig = $state(
  { returnMsg: "no Message"
  , frequency: 1500000
  , frequencyConfirmed: false
  });

export function setReturnMsg(msg: string)
{
  if (msg != '\n T  ') rig.returnMsg=msg; //ignore this message
}

export const gui = $state(
  { showProfiles: true
  , showDebug: true
  , showCat: false
  });

export const webRTC = $state(
  { api: null
  });

export const webRTCCapture = $state(
  { enable: false
  , enableVideo: false
  , session: null
  , starting: false
  , hasSession: false
  , mediaElement: {}
  , clientId: null
  , consumers: {}
  });

export const webRTCClient = $state(
  { enable: false
  , enableVideo: false
  , showAllProducers: false
  , autoStartProducers: []
  , producers: {}
  });

export type Cmd =
  { xk852serialNative: Uint8Array
  , rigctld: string
  , timeout: number
  };

export var sendCmdCallback: any;

export function setSendCmdCallback(fn: any) {
  sendCmdCallback = fn;
}
