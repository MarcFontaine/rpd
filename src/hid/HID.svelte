<script module lang="ts">
import {gui, rig, settings} from '../state.svelte';
import {setFrequencyRateLimited} from '../cat';
import Option from '../settings/Options.svelte';
import Typeahead from "svelte-typeahead";
import {nopBookmark, bookmarks} from '../bookmarks/bookmarks';

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

type HidData = {
    buttons: number
  , axisA: number
  , axisB: number
};

var hidPrev = $state(null as HidData | null);
var hidNow = $state(null as HidData | null);
var buttonConfig = $state(new Array(16).fill(nopBookmark));

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
    if ( hidPrev !== null ) {
	handleWheel(hidPrev, hidData);
	handleButtons(hidPrev, hidData);
    }
    hidPrev = hidNow
    hidNow = hidData;
};

function handleButtons(prev, now) {
    const newPressed = now.buttons & ~ prev.buttons;
    if (newPressed != 0) {
      buttonConfig.forEach( (button, i) => {
        if ( newPressed & (1 << i) ) {
            button.action();
        }
        })
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

<div class="button-settings">
<table>
  <thead>
    <tr>
      <th>Button</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#each buttonConfig as _, i}
	{@render ButtonSettings(
	    i,
	    (hidNow !==null && hidNow.buttons & (1 << i)) ? 'green' : 'black'
	)}
    {/each}
  </tbody>
</table>
</div>
{/snippet}

{#snippet ButtonSettings(i, color)}
  <tr>
    <td style:width=10%;>
      <span style:color={color} >
       {i}
      </span>
    </td>
  <td>
    <Typeahead
      value={ buttonConfig[i].label }
      label="Button Shortcuts"
      hideLabel
      placeholder={'Action for Button'}
      data={bookmarks}
      extract={ item => item.label }
      showDropdownOnFocus=true
      on:select={ event => {buttonConfig[i]=event.detail.original}}
    >
    <svelte:fragment slot="no-results">
	Command not found
    </svelte:fragment>
   </Typeahead>
  </td>
</tr>
{/snippet}

<style>
.button-settings :global([data-svelte-search] input) {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1em;
    border: 0;
    border-radius: 0;
    border: 1px solid;
  }
</style>
