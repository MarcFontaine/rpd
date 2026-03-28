<script module lang="ts">
  import Option from '../settings/Options.svelte';
  import {ConfigVar, uiOption} from '../config/ConfigVar.svelte';
  export const decadeButtonSplit = uiOption(0, 'decadeButtonSplit' );

  const mouseWheelTuningSpeed = new ConfigVar(
    { default: 100
    , path: [ 'vfo', 'mouseWheel', 'speed' ]
    });

  export {DecadeSettings};
</script>

<script lang="ts">
import DecadeDigit from '../misc/DecadeDigitSplit.svelte';
import HID from '../hid/HID.svelte';
import {gui,rig} from '../state.svelte';
import {setFrequencyRateLimited} from '../cat';

// When editMode == true, the GUI shows the frequency as being edited.
// The GUI stays in editMode for 5000ms == 5 seconds after last the edit.
// After 5 seconds the GUI shows the frequency as it is reported by the rig.
let editMode = $derived(Date.now() - gui.frequency.time < 5000);

let wheelSpeed = $derived(mouseWheelTuningSpeed.value /200/125);
const pointerSpeed = 1/10;

let frequency = $derived.by(()=> {
  if ( rig.time > gui.frequency.time && ! editMode)
    return rig.frequency;
    else return gui.frequency.value;
  });

let isConfirmed = $derived.by(() => {
    return Math.round(frequency / 10) == Math.round(rig.frequency / 10);
  });

let digits = $derived.by(()=>{
  let d = [];
  let f = frequency;
  for (let i = 0; i<8; i++) {
    d.push(f % 10);
    f = Math.floor(f/10);
  }
  return d;
  }
  );

function round(v:number, f:number) {
  return (Math.round(f/v)*v)
}

function clamp(f:number) {
  if (f < 1500000) return 1500000
    else if (f > 29999999) return 29999999
    else return f;
}

function onDelta(v:number) {
  // This is very tricky and overcomplicated
  // because onDelta uses shared state
  // There must be extactly on onDelta for each digit !!
  // This was done to get smooth tuning.
  // All the deltas should be accumulated.
  // Small deltas that do no switch the digit should not get lost when
  // the digits actually switches
  let accum_scroll = 0;
  let last_update = 0;
  const initialFrequency = frequency;
  return (delta:number) => {
    accum_scroll += delta * v;
    const delta_scroll = accum_scroll - last_update;
    if (Math.abs(delta_scroll) >= v) {
      const newFreq = round(v, initialFrequency + delta_scroll);
      last_update += (newFreq - initialFrequency);
      setFrequencyRateLimited(clamp(newFreq));
      }
  }
}
</script>

{#snippet DecadeSettings()}
<div>
  <input
    type="number"
    bind:value={decadeButtonSplit.value}
    min="0"
    max="20"
  >
  Gap between upper and lower decade digits
  <br>
  <input type="number" bind:value={mouseWheelTuningSpeed.value}>
  Mouse Wheel Tunings Speed
</div>
{/snippet}

{#snippet myDigit(d, onDelta)}
  <DecadeDigit
    isConfirmed = {isConfirmed}
    d = {d}
    onDeltaWheel = { (e) => {
      e.preventDefault();
      onDelta(- e.deltaY * wheelSpeed)
    }}

    onDeltaPointer = { (e) => {
       e.preventDefault();
       onDelta(e.movementY * pointerSpeed)
    }}

    onDeltaClick = { (dir) => onDelta(dir) }

    gap = {decadeButtonSplit.value}
  />
{/snippet}

<div style="display:flex; flex-direction: column;">
  <div class="decade" >
    {@render myDigit(digits[7], onDelta(10000000))}
    {@render myDigit(digits[6], onDelta(1000000))}
    {@render myDigit(digits[5], onDelta(100000))}
    {@render myDigit(digits[4], onDelta(10000))}
    {@render myDigit(digits[3], onDelta(1000))}
    <div> . </div>
    {@render myDigit(digits[2], onDelta(100))}
    {@render myDigit(digits[1], onDelta(10))}
  </div>
  <HID/>
</div>

<style>
.decade {
  display:flex;
  flex-direction: row;
  font-size: 3em;
}
</style>
