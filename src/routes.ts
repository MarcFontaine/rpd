import Config from './Config.svelte';
import RigControl from './RigControl.svelte';
import LocalSerial from './LocalSerial.svelte';
import Debug from './Debug.svelte';
import WebRTCToggle from './WebRTCToggle.svelte';
import Wheel from './misc/Wheel.svelte';
import Test from './misc/Test.svelte';
import Frequency from './cat/Frequency.svelte';
import Auxiliary from './aux/Auxiliary.svelte';
import HID from './misc/HID.svelte';

export const routes = {
  '/' : LocalSerial
, '/rigcontrol' : RigControl
, '/config/*' : Config
, '/config' : Config
, '/debug' : Debug
, '/serial' : LocalSerial
, '/webrtc' : WebRTCToggle
, '/aux' : Auxiliary
, '/wheel' : Wheel
, '/hid' : HID
, '/frequency' : Frequency
, '/test' : Test
}
