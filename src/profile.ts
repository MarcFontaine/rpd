import {replace} from 'svelte-spa-router';

// import * as WebSerial from './serial';
// import * as WebSocket from './websocket';
import * as WebRTC from './webrtc/webrtc';
import * as WebRTCCapture from './webrtc/capture';
import * as EspHome from './esphome';
import { webRTC, webRTCClient, webRTCCapture } from './state.svelte';
import { espSwrMeterEnable, espSwrMeterUrl } from './level/level-settings';

/*
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
   case 'EspHomeEvent':
     {
       EspHome.connect(l.espHomeURL);
       break;
     }

};
};
*/

export async function initProfile() {
  if (espSwrMeterEnable.value) {
    EspHome.connect(espSwrMeterUrl.value);
  };
  if (WebRTC.enableSink.value) {
       if (!webRTC.api) {
         webRTC.api = WebRTC.initWebRTC();
       };
       WebRTC.initRemoteStreams(webRTC.api)
       webRTCClient.enable = true;
  }
  if (WebRTC.enableSource.value) {
      if (!webRTC.api) {
	webRTC.api = WebRTC.initWebRTC();
      };
      WebRTCCapture.initCapture(webRTC.api)
      webRTCCapture.enable = true;
  }
//  p.links.forEach(initLink)
  replace('/rigcontrol');
};
