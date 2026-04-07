<script lang="ts">
import { onMount } from 'svelte';
import * as DecadeSettings from './DecadeSettings.svelte';
import DecadeDigit from '../misc/DecadeDigitSplit.svelte';
import {gui, rig} from '../state.svelte';
import {setFrequencyRateLimited} from '../cat';

const debug = false;

let old = undefined as number | undefined;

function setFrequency(f: number) : void {
  frequency = f;
  if (!old || old != frequency) {
    setFrequencyRateLimited(frequency);
    old = frequency;
  }
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

</script>

{#snippet myDigit(exp)}
  <DecadeDigit
    rounding = { DecadeSettings.rounding.value }
    exp = { exp }
    min = {  1500000 }
    max = { 29999999 }
    value = { frequency }
    setter = { f => setFrequency(f) }
    wheelSpeed = { DecadeSettings.mouseWheelTuningSpeed.value / 200/ 125 }
    clickSpeed = { 1 }
    isConfirmed = { isConfirmed }
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
    rounding = { false }
    exp = { 0 }
    min = { 0 }
    max = { 0 }
    value = { 0 }
    setter = { f => {return;} }
    wheelSpeed = { 0 }
    clickSpeed = { 0 }
    isConfirmed = { isConfirmed }
    gap = { DecadeSettings.buttonSplit.value }
    width = "3%"
    char = '.'
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
 /* cqw is a string on definition time
    and computed at use time */
  --digit-font-size: 25cqw;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  touch-action: manipulation;
}
</style>
