import { gotoRigcontrol } from './ui/routes';

import * as WebSerial from './serial';
import * as WebSocket from './websocket';
import * as WebRTC from './webrtc/webrtc';
import * as WebRTCCapture from './webrtc/capture';
import * as EspHome from './esphome';
import { webRTC, webRTCClient, webRTCCapture,
   rigctld_enable, rigctld_wss, webserial_enable }
   from './state.svelte';
import { espSwrMeterEnable, espSwrMeterUrl } from './level/level-settings';
import * as HamLink from './hamlink/hamlink'

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
  if (rigctld_enable.value) {
    WebSocket.connect(rigctld_wss.value);
  }
  if (webserial_enable.value) {
    WebSerial.initWebSerial();
    WebSerial.connectToPort();
  }
  HamLink.initHamLink();
  gotoRigcontrol();
};
