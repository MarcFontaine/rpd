<script module lang="ts">
  import Option from '../settings/Options.svelte';
  import {ConfigVar, uiOption} from '../config/ConfigVar.svelte';
  export const decadeButtonSplit = uiOption(0, 'decadeButtonSplit' );

  const mouseWheelTuningSpeed = new ConfigVar(
    { default: 100
    , path: [ 'vfo', 'mouseWheel', 'speed' ]
    });

  const decadeRounding = new ConfigVar(
    { default: true
    , path: [ 'vfo', 'decade', 'rounding' ]
    });

  export {DecadeSettings};
</script>

<script lang="ts">
import { onMount } from 'svelte';
import DecadeDigit from '../misc/DecadeDigitSplit.svelte';
import {gui,rig} from '../state.svelte';
import {setFrequencyRateLimited} from '../cat';

const debug = false;

function accum(d:number):void {
  frequency = clamp (frequency + d);
}

let now = $state(Date.now());
$effect(() => {
  const interval = setInterval(() => {
    now = Date.now();
  }, 1000);
  return () => clearInterval(interval);
});

let editMode = $derived(now - gui.frequency.time < 5000);

// When editMode == true, the GUI shows the frequency as being edited.
// there should be three styles:
// 1) the value is confirmed
// 2) the value is being edited/updated
// 3) error: the value is outdated. connection lost

let frequency = $derived.by(()=> {
  if ( rig.time > gui.frequency.time && ! editMode)
    return rig.frequency;
    else return gui.frequency.value;
  });

var rounded = $state(0);
onMount(() => {
  rounded = frequency;
});

function setRounded(exp) {
    rounded = Math.sign(frequency) * Math.floor(Math.abs(frequency)/exp) * exp;
}


let isConfirmed = $derived.by(() => {
    return Math.round(frequency / 10) == Math.round(rig.frequency / 10);
  });

function round(v:number, f:number) {
  return (Math.round(f/v)*v)
}

function clamp(f:number) {
  if (f < 1500000) return 1500000
    else if (f > 29999999) return 29999999
    else return f;
}

let old = undefined as undefined | number;
function setValue(isRounding) {
  const newValue = isRounding ? clamp(rounded) : clamp(frequency);
  if (!old || old != newValue) {
    setFrequencyRateLimited(newValue);
    old = newValue;
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
  <Option bind:o={decadeRounding.value} d={'Auto Rounding of VFO frequency '} />
</div>
{/snippet}

{#snippet myDigit(exp)}
  <DecadeDigit
    isConfirmed = {isConfirmed}
    v = { decadeRounding.value ? rounded : frequency }
    exp = {exp}
    accum = { d => {
      accum(d);
      setRounded(exp);
      setValue(decadeRounding.value);
      }
    }
    wheelSpeed = {mouseWheelTuningSpeed.value / 200/ 125 * exp}
    pointerSpeed = {1/10 * exp}
    clickSpeed = {1 * exp}
    gap = {decadeButtonSplit.value}
  />
{/snippet}

<div class="decade" >
  {@render myDigit(10000000)}
  {@render myDigit(1000000)}
  {@render myDigit(100000)}
  {@render myDigit(10000)}
  {@render myDigit(1000)}
  <div> . </div>
  {@render myDigit(100)}
  {@render myDigit(10)}
</div>
{#if debug}
<div>
  {frequency}
  <br>
  {rounded}
</div>
{/if}

<style>
.decade {
  display:flex;
  flex-direction: row;
  font-size: 3em;
}
</style>
