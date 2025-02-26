import Config from './Config.svelte';
import RigControl from './RigControl.svelte';
import LocalSerial from './LocalSerial.svelte';
import Debug from './Debug.svelte';
import WebRTCToggle from './WebRTCToggle.svelte';

export const routes = {
  '/' : LocalSerial
, '/rigcontrol' : RigControl
, '/config/*' : Config
, '/config' : Config
, '/debug' : Debug
, '/serial' : LocalSerial
, '/webrtc' : WebRTCToggle
}
