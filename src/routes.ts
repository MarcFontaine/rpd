import Config from './Config.svelte';
import RigControl from './RigControl.svelte';
import LocalSerial from './LocalSerial.svelte';
import Debug from './misc/Debug.svelte';
import WebRTCToggle from './WebRTCToggle.svelte';
import Wheel from './misc/Wheel.svelte';
import Test from './misc/Test.svelte';
import Frequency from './cat/Frequency.svelte';
import Settings from './misc/Settings.svelte';
import Auxiliary from './aux/Auxiliary.svelte';
import HID from './misc/HID.svelte';
import Row from './Row.svelte';
import Col from './Col.svelte';

export const routes = {
  '/': LocalSerial
, '/rigcontrol': RigControl
, '/config/*': Config
, '/config': Config
, '/debug': Debug
, '/serial': LocalSerial
, '/webrtc': WebRTCToggle
, '/aux': Auxiliary
, '/wheel': Wheel
, '/hid': HID
, '/frequency': Frequency
, '/settings': Settings
, '/test': Test
, '/r': Row
, '/c': Col
}
