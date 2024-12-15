/* eslint-disable */
// @ts-nocheck

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
  const element = document.getElementById(producer.id);
  if (element) {
    if (element._consumerSession) {
      element._consumerSession.close();
    }
    element.remove();
  }
};

function producerAdded(api) { return producer => {
  const remoteStreamsElement = document.getElementById("remote-streams");
  console.log(producer)
  const producerId = producer.id
  if (!document.getElementById(producerId)) {
    remoteStreamsElement.insertAdjacentHTML("beforeend",
      `<div id="${producerId}">
       <br>
       ${producer.meta.name}
       <br>
       Stream ID : ${producerId}
       <button>Start</button>
       <video></video>
     </div>`);
  };
  const entryElement = document.getElementById(producerId);
  const videoElement = entryElement.getElementsByTagName("video")[0];
  const buttonElement = entryElement.getElementsByTagName("button")[0];

  videoElement.addEventListener("playing", () => {
    buttonElement.innerHTML = 'Stop';
    if (entryElement.classList.contains("has-session")) {
      entryElement.classList.add("streaming");
    }
  });

  buttonElement.addEventListener("click", (event) => {
    event.preventDefault();
    if (entryElement._consumerSession) {
      entryElement._consumerSession.close();
      buttonElement.innerHTML = 'Start';
    } else {
      buttonElement.innerHTML = 'Connecting';
      let session = null;
      session = api.createConsumerSession(producerId);
      console.log(session)
      if (session) addSession(entryElement, videoElement, session);
    };
  });
}
};

function addSession(entryElement, videoElement, session) {
  entryElement._consumerSession = session;

  session.mungeStereoHack = true;

  session.addEventListener("error", (event) => {
    if (entryElement._consumerSession === session) {
      console.error(event.message, event.error);
    }
  });

  session.addEventListener("closed", () => {
    if (entryElement._consumerSession === session) {
      videoElement.pause();
      videoElement.srcObject = null;
      entryElement.classList.remove("has-session", "streaming", "has-remote-control");
      delete entryElement._consumerSession;
    }
  });

  session.addEventListener("streamsChanged", () => {
    if (entryElement._consumerSession === session) {
      const streams = session.streams;
      if (streams.length > 0) {
	videoElement.srcObject = streams[0];
	videoElement.play().catch(() => {});
      }
    }
  });

  session.addEventListener("remoteControllerChanged", () => {
    if (entryElement._consumerSession === session) {
      const remoteController = session.remoteController;
      if (remoteController) {
	entryElement.classList.add("has-remote-control");
	remoteController.attachVideoElement(videoElement);
	remoteController.addEventListener("info", (e) => {
	  console.log("Received info message from producer: ", e.detail);
	});
      } else {
	entryElement.classList.remove("has-remote-control");
      }
    }
  });

  entryElement.classList.add("has-session");
  session.connect();
};

// @filename: webrtc.ts
export function initWebRTC() {
  const gstWebRTCConfig = {
    meta: {
      name: `XK852RigControl-${Date.now()}`
      },
    signalingServerUrl: `wss://remote-qth.oh0.duckdns.org:443/ice`,
    webrtcConfig: {
	iceServers: [
	 {
	   urls: [
	   "stun:oh0.duckdns.org:3478"
	   ]
	 }
	]	
//        , 'iceTransportPolicy': 'relay'

     }

  };

  const api = new GstWebRTCAPI(gstWebRTCConfig);
  initRemoteStreams(api);
};
