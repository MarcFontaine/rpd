/* eslint-disable */
// @ts-nocheck
import * as Config from './config';
import * as State from './state';
import {webRTC, webRTCClient} from './state.svelte';

// @filename: webrtc.ts
export function initRemoteStreams(api:any) {
  const listener = {
    producerAdded: producerAdded(api),
    producerRemoved: producerRemoved
  };

  api.registerProducersListener(listener);
  for (const producer of api.getAvailableProducers()) {
    listener.producerAdded(producer);
  }
}

function producerRemoved(producer) {
  const id = producer.id;
  if (webRTCClient.producers[id]) {
    if (webRTCClient.producers[id].session) {
      webRTCClient.producers[id].session.close();
    };
    delete webRTCClient.producers[id]
  }
};

function producerAdded(api) { return producer => {
  const producerId = producer.id
  webRTCClient.producers[producerId] = {
      producer: producer
    , hasSession: false
    , session: null
    };
  }
};

export function startSession(state, videoElement, session) {
  state.session = session;

  session.mungeStereoHack = true;

  session.addEventListener("error", (event) => {
    if (state.session === session) {
      console.error(event.message, event.error);
    }
  });

  session.addEventListener("closed", () => {
    if (state.session === session) {
      videoElement.pause();
      videoElement.srcObject = null;
      state.hasSession = false;
      state.streaming = false;
      state.hasRemoteControl = false;
      state.session = null;
    }
  });

  session.addEventListener("streamsChanged", () => {
    if (state.session === session) {
      const streams = session.streams;
      if (streams.length > 0) {
	videoElement.srcObject = streams[0];
	videoElement.play().catch(() => {});
      }
    }
  });

  session.addEventListener("remoteControllerChanged", () => {
    if (state.session === session) {
      const remoteController = session.remoteController;
      if (remoteController) {
	state.hasRemoteControl = true;
	remoteController.attachVideoElement(videoElement);
	remoteController.addEventListener("info", (e) => {
	  console.log("Received info message from producer: ", e.detail);
	});
      } else {
	state.hasRemoteControl = false;
      }
    }
  });

  state.hasSession = true;
  session.connect();
};

export function initWebRTC() {
  const api = new GstWebRTCAPI(State.currentProfile.gstWebRTCConfig);
  return api;
};
