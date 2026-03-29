import { ConfigVar } from '../config/ConfigVar.svelte';

export const enableHamLink = new ConfigVar(
    { default: true
    , path: [ 'cat', 'enableHamLink' ]
    });

let port: chrome.runtime.Port | null = null;

const EXTENSION_ID = "lkoajfagppjiemkcapkonlmekekncdei"

export function initHamLink() {
  if (enableHamLink.value) connectToExtension()
}

function connectToExtension() {
  if (!port) port = chrome.runtime.connect(EXTENSION_ID);
  if (port) {
    port.onMessage.addListener((msg:any) => {
      window.dispatchEvent(msgToEvent(msg));
      console.log("JSON empfangen:", msg);
    });

    port.onDisconnect.addListener(() => {
      console.warn("Connection Lost. retrying");
      port = null;
      setTimeout(connectToExtension, 1000);
    });
  }
}

function msgToEvent(msg:any) : CustomEvent {
  switch (msg.type) {
    case "wsjtx-receive":
      return new CustomEvent('wsjtx-receive', {
        detail: msg.payload
      })
    default:
      console.error('Cannot route message', msg);
      throw new Error('Cannot route message', msg);
    break;
  }
}