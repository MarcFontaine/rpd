<script module lang="ts">
import {gui, rig, settings} from '../state.svelte';
import {setFrequencyRateLimited} from '../cat';
import Option from '../settings/Options.svelte';
export { HIDsettings };
const speed = 10;

// code-duplication with cat/Frequency !
let editMode = $derived(Date.now() - gui.frequency.time < 5000);

let frequency = $derived.by(()=> {
  if ( rig.time > gui.frequency.time && ! editMode)
    return rig.frequency;
    else return gui.frequency.value;
  });

let isConfirmed = $derived.by(() => {
    return Math.round(frequency / 10) == Math.round(rig.frequency / 10);
  });

function clamp(f:number) {
  if (f < 1500000) return 1500000
    else if (f > 29999999) return 29999999
    else return f;
}

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

var isInit = false;
var prevHidData = null;

function parseHidEvent(event) {
  const { data, device, reportId } = event;
  return {
      buttons : data.getUint8(0),
      axisA : data.getInt16(1, true),
      axisB : data.getInt16(3, true)
  };
}

function handleHidInput(event) {
    const hidData = parseHidEvent(event);
    if ( isInit ) {
	handleWheel(prevHidData, hidData);
	handleButtons(prevHidData, hidData);	
    }
    else
    {
	isInit = true;
    };
    prevHidData = hidData;
};
function handleButtons(prev, now){
    if (prev.buttons != now.buttons) {
	console.log(now.buttons);
    }
};
function handleWheel(prev, now){
    if (prev.axisA != now.axisA || prev.axisB != now.axisB ) {
	setFrequencyRateLimited(clamp(
	    frequency
		+ delta(now.axisA, prev.axisA) * speed
		+ delta(now.axisB, prev.axisB) * speed /10000 * settings.magnetTuningSpeed
	));
    };
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
      dumpDeviceReport(rigControl);	
      rigControl.addEventListener("inputreport", handleHidInput);
    }
  }
}

function dumpDeviceReport(device) {
  for (let collection of device.collections) {
    console.log(`Usage Page: ${collection.usagePage}`); // 1 for Generic Desktop
    console.log(`Usage: ${collection.usage}`);
    for (let inputReport of collection.inputReports) {
      console.log(`Report ID: ${inputReport.reportId}`);
      for (let item of inputReport.items) {
	console.log(`Bits: ${item.reportSize} x ${item.reportCount}`);
	console.log(`Values: ${item.logicalMinimum} to ${item.logicalMaximum}`);
      }
    }
  };
}

</script>

{#if settings.enableRotaryEncoder}
  <div>
  <button
    onclick={connectRigControl}
  >
  Connect USB Rotary Encoder
  </button>
  </div>
{/if}

{#snippet HIDsettings()}
<div>
  <Option bind:o={settings.enableRotaryEncoder} d={'Enable USB Rotary Encoder'} />
  {#if settings.enableRotaryEncoder}
    <br>
    <input type="number" bind:value={settings.magnetTuningSpeed}> Hall Rotary Encoder Tunings Speed
  {/if}
</div>
{/snippet}
