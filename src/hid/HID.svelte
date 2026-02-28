<script module lang="ts">
import {gui, rig } from '../state.svelte';
import { ConfigVar } from '../config/ConfigVar.svelte';
import {setFrequencyRateLimited} from '../cat';
import Option from '../settings/Options.svelte';
import {buttonConfig} from './ButtonConfig.svelte';

export {HIDsettings};

const enableRotaryEncoder = new ConfigVar(
    { default: true
    , path: [ 'rigpage', 'current_config', 'hid', 'rotaryEncoder', 'enable' ]
    });

const mouseWheelTuningSpeed = new ConfigVar(
    { default: 100
    , path: [ 'rigpage', 'current_config', 'vfo', 'mouseWheel', 'speed' ]
    });

const magnetTuningSpeed = new ConfigVar(
    { default: 100
    , path: [ 'rigpage', 'current_config', 'vfo', 'rotaryEncoder', 'speed' ]
    });

const speed = 10;

// code-duplication with cat/Frequency !
let editMode = $derived(Date.now() - gui.frequency.time < 5000);

let frequency = $derived.by(()=> {
  if ( rig.time > gui.frequency.time && ! editMode)
    return rig.frequency;
    else return gui.frequency.value;
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

type HidData = {
    buttons: number
  , axisA: number
  , axisB: number
};

export const hidStore = $state({
    current: null as HidData | null,
    previous: null as HidData | null
});

function parseHidEvent(event: HIDInputReportEvent) {
  const { data, device:_d, reportId:_r } = event;
  return {
      buttons : data.getUint16(0),
      axisA : data.getInt16(2, true),
      axisB : data.getInt16(4, true)
  };
}

function handleHidInput(event: HIDInputReportEvent) {
    const hidData = parseHidEvent(event);
    if ( hidStore.previous !== null ) {
	handleWheel(hidStore.previous, hidData);
	handleButtons(hidStore.previous, hidData);
    }
    hidStore.previous = hidStore.current
    hidStore.current = hidData;
};

function handleButtons(prev:HidData , now:HidData) {
    const newPressed = now.buttons & ~ prev.buttons;
    if (newPressed != 0) {
      buttonConfig.forEach( (button, i) => {
        if ( newPressed & (1 << i) ) {
            button.action();
        }
        })
    }
};

function handleWheel(prev:HidData , now:HidData) {
    if (prev.axisA != now.axisA || prev.axisB != now.axisB ) {
	setFrequencyRateLimited(clamp(
	    frequency
		+ delta(now.axisA, prev.axisA) * speed
		+ delta(now.axisB, prev.axisB) * speed /10000 * magnetTuningSpeed.value
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

function dumpDeviceReport(device:HIDDevice) {
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

{#if enableRotaryEncoder.value}
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
  <Option bind:o={enableRotaryEncoder.value} d={'Enable USB Rotary Encoder'} />
  {#if enableRotaryEncoder.value}
    <br>
    <input type="number" bind:value={magnetTuningSpeed.value}> Hall Rotary Encoder Tunings Speed
  {/if}
  <br>
    <input type="number" bind:value={mouseWheelTuningSpeed.value}> Mouse Wheel Tunings Speed
  <br>
</div>
{/snippet}