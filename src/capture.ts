/* eslint-disable */
// @ts-nocheck
import {webRTC, webRTCCapture} from './state.svelte';

export async function initCapture(api) {
  const listener = {
    connected: function(clientId) { webRTCCapture.clientId=clientId},
    disconnected: function() { webRTCCapture.clientId=null}
  };
  api.registerConnectionListener(listener);
}

export async function stopSession() {
  if (webRTCCapture.session) webRTCCapture.session.close();
}

export async function startSession() {
  if (! webRTCCapture.starting) {
      webRTCCapture.starting = true;
      const constraints = {
           'video': webRTCCapture.enableVideo,
           'audio': true
      };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
	const session = webRTC.api.createProducerSession(stream);
	if (session) {
	  webRTCCapture.session = session;

	  session.addEventListener("error", (event) => {
	    if (webRTCCapture.session === session) {
	      console.error(event.message, event.error);
	    }
	  });

	  session.addEventListener("closed", () => {
	    if (webRTCCapture.session === session) {
	      webRTCCapture.mediaElement.pause();
              webRTCCapture.mediaElement.srcObject = null;
	      webRTCCapture.hasSession = false;
	      webRTCCapture.starting = false;
	      webRTCCapture.session = null;
	    }
	  });

	  session.addEventListener("stateChanged", (event) => {
	    if ((webRTCCapture.session === session) &&
	      (event.target.state === GstWebRTCAPI.SessionState.streaming)) {
	      webRTCCapture.mediaElement.srcObject = stream;
	      webRTCCapture.mediaElement.play().catch(() => {});
	      webRTCCapture.starting = false;
	    }
	  });

	  session.addEventListener("clientConsumerAdded", (event) => {
	    if (webRTCCapture.session === session) {
	      webRTCCapture.consumers[event.detail.peerId]="Connected";
	    }
	  });

	  session.addEventListener("clientConsumerRemoved", (event) => {
	    if (webRTCCapture.session === session) {
	      delete webRTCCapture.consumers[event.detail.peerId];
	    }
	  });

	  webRTCCapture.hasSession = true;
	  session.start();
	} else {
	  for (const track of stream.getTracks()) {
	    track.stop();
	  }
	  webRTCCapture.starting = false;
	}
      }).catch((error) => {
	console.error("cannot have access to webcam and microphone", error);
	webRTCCapture.session = null;
      });
    }
};
