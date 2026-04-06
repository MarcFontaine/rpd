<script lang="ts">
import { onMount } from 'svelte';
import * as DecadeSettings from './DecadeSettings.svelte';
import DecadeDigit from '../misc/DecadeDigitSplit.svelte';
import {gui, rig} from '../state.svelte';
import {setFrequencyRateLimited} from '../cat';

const debug = false;

let old = undefined as undefined | number;

function accum( d: number, exp: number ): void {
  const fn = clamp(frequency + d * exp);
  frequency = DecadeSettings.rounding.value ? round(fn, exp) : fn;
  if (!old || old != frequency) {
      setFrequencyRateLimited(frequency);
      old = frequency;
  }
}

function round(a: number, exp:number) {
  return clamp(Math.sign(a) * Math.floor(Math.abs(a)/exp) * exp )
}

let now = $state(Date.now());

$effect(() => {
  const interval = setInterval(() => {
    now = Date.now();
  }, 500);
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

let isConfirmed = $derived.by(() => {
    return Math.round(frequency / 10) == Math.round(rig.frequency / 10);
  });

function clamp(f:number) {
  if (f < 1500000) return 1500000
    else if (f > 29999999) return 29999999
    else return f;
}

function toDigit(exp) {
  const d = Math.floor(Math.abs(frequency)/exp) - Math.floor(Math.abs(frequency)/exp/10)*10;
  return d.toString();
}
</script>

{#snippet myDigit(exp)}
  <DecadeDigit
    isConfirmed = {isConfirmed}
    char = { toDigit(exp) }
    accum = {
      d => { accum(d, exp) }
    }
    wheelSpeed = { DecadeSettings.mouseWheelTuningSpeed.value / 200/ 125 }
    clickSpeed = { 1 }
    gap = { DecadeSettings.buttonSplit.value }
    width = "14%"
  />
{/snippet}
<div
<div
  class="decade"
>
  {@render myDigit(10000000)}
  {@render myDigit(1000000)}
  {@render myDigit(100000)}
  {@render myDigit(10000)}
  {@render myDigit(1000)}
  <DecadeDigit
    isConfirmed = {isConfirmed}
    char = '.'
    accum = { d => { return;}}
    wheelSpeed = 0
    pointerSpeed = 0
    clickSpeed = 0
    gap = 0
    width = "3%"
  />
  {@render myDigit(100)}
  {@render myDigit(10)}
</div>
{#if debug}
<div>
  {frequency}
  <br>
  {rig.frequnecy}
</div>
{/if}

<style>
.decade {
  width: 100%;
  container-type: inline-size;
  display:flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: hidden;
  --digit-font-size: 25cqw; /* cqw is passed as string */
}
</style>
