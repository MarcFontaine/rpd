<script lang="ts">
import {gui,rig} from '../state.svelte';
import {setFrequencyRateLimited} from '../cat';

const speed=10;
// code-duplication with cat/Frequency !
let editMode = $derived(Date.now() - gui.frequency.time < 5000);

let frequency = $derived.by(()=> {
  if ( rig.time > gui.frequency.time && ! editMode)
    return rig.frequency;
    else return gui.frequency.value;
  });

let isConfirmed = $derived.by(() => {
  return frequency == rig.frequency;
  });

function clamp(f:number) {
  if (f < 1500000) return 1500000
    else if (f > 29999999) return 29999999
    else return f;
}

var oldWheel = 0;
var isInit = false;

function handleHidInput(event) {
  const { data, device, reportId } = event;
  const wheel = data.getInt16(1, true);
  if (isInit &&  wheel != oldWheel) {
    var delta;
    const dwrap = wheel - oldWheel // 16 bit wrap around
    if ( dwrap > 40000)
    {
      delta = - 65537;
    }
    else if (dwrap < -40000)
    {
      delta = dwrap + 65537; 
    }
    else {
      delta = dwrap;
    }
    oldWheel = wheel;
    setFrequencyRateLimited(clamp(frequency + delta * speed));
  }
  if (!isInit) {
    oldWheel = wheel;
    isInit = true;
  }
};

// https://github.com/WICG/webhid/issues/105
//     navigator.hid.addEventListener("connect", ({ device }) => {
// does not fire:
// https://stackoverflow.com/questions/63708685/webhid-api-reconnect-device says
// device needs a serial number
//const oldDevices = await navigator.hid.getDevices();


async function connectRigControl() {
  if ("hid" in navigator) {
    const deviceFilter = {
      filters : [
        { vendorId: 0x0483, productId: 0x5757, usagePage: 1 }
      ]
    };
    const devices = await navigator.hid.requestDevice(deviceFilter);
    if (devices && devices[0]) {
      const rigControl = devices[0];
      await rigControl.open();
      rigControl.addEventListener("inputreport", handleHidInput);
    }
  }
}
</script>

<div>
RigControl USB Device

<br>
<button
  onclick={connectRigControl}
>
Connect RigControl USB device
</button>

</div>
