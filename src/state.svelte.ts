// import * as Types from './types';

export const currentProfile = $state( { p: {} } );

const emptyLogs : Array<any> = [] //Todo: limit size

export const log = $state(
  { objs:   emptyLogs
  , errors: emptyLogs
  });

export function pushError(obj:any) {
  obj.isError = true;
  obj.isErrorConfirmed = false;
  log.errors.push(obj)
  pushLog(obj);
};

export function pushLog(obj:any) {
  if (!obj.date) obj.date = new Date();
  log.objs.push(obj)
};

export const gui = $state(
  { frequency:
    { value: 1500000
    , time: Date.now ()
    , confirmed: false
    }
  , showWebRTC: false
  });

export const rig = $state(
  { returnMsg: "no Message"
  , time: Date.now ()
  , frequency: 1500000
  , power: {}
  , mode: {}
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

export const espHomeEvent = $state(
  { data: ""
  });

export function sendCmdCallbackError(_cmd:any) {
  pushError(
    { src: 'CAT'
    , date: new Date()
    , msg: 'Tranceiver not connected.'
    });
};

export var sendCmdCallback = sendCmdCallbackError;

export function setSendCmdCallback(fn: any) {
  sendCmdCallback = fn;
}

export const settings = $state(
  { expertMode: false
  , demoMode: false
  , screen1: 'RigControl'
  , screen2: 'Debug'
  , screen3: 'Settings'
  , screen4: 'Empty'
  , showSearchBar: true
  , showNavigationBar: true
  , showDecadeButtons: false
  , showPTT: true
  , smartPTT: true
  , rigSyncInterval: 20
  });