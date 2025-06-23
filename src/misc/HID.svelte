<script lang="ts">
import {gui, rig, settings} from '../state.svelte';
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

var wheelA = 0;
var wheelB = 0;
var isInit = false;

function delta(a:number, b:number) {
    const delta_raw = a - b; // 16 bit wrap around
    if ( delta_raw > 40000)
    {
       return (delta_raw - 65537);
    }
    else if (delta_raw < -40000)
    {
      return (delta_raw + 65537);
    }
    else
    {
      return delta_raw;
    }
};

function handleHidInput(event) {
  const { data, device, reportId } = event;
  const wa = data.getInt16(1, true);
  const wb = data.getInt16(3, true);
  if (isInit &&  (wheelA != wa || wheelB != wb)) {
    setFrequencyRateLimited(clamp( frequency
      + delta(wa, wheelA) * speed
      + delta(wb, wheelB) * speed /10000 * settings.magnetTuningSpeed
      ));
    wheelA = wa;
    wheelB = wb;
  }
  if (!isInit) {
    wheelA = wa;
    wheelB = wb;
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
