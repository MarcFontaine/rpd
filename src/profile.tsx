import {replace} from 'svelte-spa-router';

import * as State from './state';
import * as WebSerial from './serial';
import * as WebSocket from './websocket';
import * as WebRTC from './webrtc';
import * as WebRTCCapture from './capture';
import {webRTC, webRTCClient, webRTCCapture } from './state.svelte';

async function initLink(l: any) {
  switch (l.type) {
   case 'WebSerial':
     {
       WebSerial.initWebSerial();
       WebSerial.connectToPort();
       break;
     }
   case 'RigctldWS':
     {
       WebSocket.connect(l.wsServerURL);
       break;
     }
   case 'WebRTCSink':
     {
       if (!webRTC.api) {
         webRTC.api = WebRTC.initWebRTC();
       };
       WebRTC.initRemoteStreams(webRTC.api)
       webRTCClient.enable = true;
       break;
     }
   case 'WebRTCSource':
     {
       if (!webRTC.api) {
         webRTC.api = WebRTC.initWebRTC();
       };
       WebRTCCapture.initCapture(webRTC.api)
       webRTCCapture.enable = true;
       break;
     }
};

};
export async function initProfile(p: any) {
  State.setCurrentProfile(p)
  p.links.forEach(initLink)
  replace('/rigcontrol');
};
