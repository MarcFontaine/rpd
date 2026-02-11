// import * as Types from './types';
import GstWebRTCAPI from 'gstwebrtc-api';

import {type GstWebRTCConfig} from 'gstwebrtc-api/types/config.js';
export const currentProfile = $state( {
p: {
  gstWebRTCConfig: null as (null | GstWebRTCConfig)
}
} );

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
  { api: null as (GstWebRTCAPI | null)
  });

export const webRTCCapture = $state(
  { enable: false
  , enableVideo: false
  , session: null
  , starting: false
  , hasSession: false
  , mediaElement: null as (HTMLVideoElement | null)
  , clientId: null
  , consumers: {}
  });

export const webRTCClient = $state(
  { enable: false
  , enableVideo: false
  , showAllProducers: false
  , autoStartProducers: []
  , producers: ({} as Record<string, ProducerState>)
  });


import ConsumerSession from 'gstwebrtc-api/types/consumer-session.js';
import type {Peer} from 'gstwebrtc-api/types/gstwebrtc-api.js';
export type ProducerState = {
    session : ConsumerSession | null
  , producer: Peer
  , hasSession: Boolean
  , streaming: Boolean
  , hasRemoteControl: Boolean
};

export type Cmd =
  { xk852String: string  // string without line breaks
  , xk852serialNative: Uint8Array
  , rigctld: string
  , timeout: number
  };

export const espHomeEvent = $state(
  { data: ""
  , powerForward: 0
  , powerReverse: 0
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
  , mobileMode: false
  , screen1: 'RigControl'
  , screen2: 'Debug'
  , screen3: 'Settings'
  , screen4: 'Empty'
  , showSearchBar: true
  , showNavigationBar: true
  , showDecadeButtons: false
  , showPTT: true
  , smartPTT: true
  , showAntennaTuner: true
  , rigSyncInterval: 20
  , mouseWheelTuningSpeed: 100
  , enableRotaryEncoder: true
  , magnetTuningSpeed: 100
  });