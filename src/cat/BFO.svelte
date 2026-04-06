<script lang="ts">
import { onMount } from 'svelte';
import * as DecadeSettings from './DecadeSettings.svelte';
import DecadeDigit from '../misc/DecadeDigitSplit.svelte';
import {gui, rig} from '../state.svelte';
import {} from '../cat';

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

let editMode = $derived(now - gui.bfo.time < 5000);

// When editMode == true, the GUI shows the frequency as being edited.
// there should be three styles:
// 1) the value is confirmed
// 2) the value is being edited/updated
// 3) error: the value is outdated. connection lost

let frequency = $derived.by(()=> {
  if ( rig.time > gui.bfo.time && ! editMode)
    return rig.bfo;
    else return gui.bfo.value;
  });


let isConfirmed = $derived.by(() => {
    return Math.round(frequency / 10) == Math.round(rig.frequency / 10);
  });

function round(v:number, f:number) {
  return (Math.round(f/v)*v)
}

function clamp(f:number) {
  if (f < -999) return -999
    else if (f > 999) return 999
    else return f;
}

let old = undefined as undefined | number;
function setValue(isRounding) {
  const newValue = isRounding ? clamp(rounded) : clamp(frequency);
  if (!old || old != newValue) {
//    setFrequencyRateLimited(newValue);
    old = newValue;
  }
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
    accum = { d => {
      accum(d * exp);
      }
    }
    wheelSpeed = {DecadeSettings.mouseWheelTuningSpeed.value / 200/ 125 }
    clickSpeed = {1}
    gap = {0}
    width ="30%"
  />
{/snippet}

<div class="decade" >
  <DecadeDigit
    isConfirmed = {isConfirmed}
    char = {frequency > 0 ? '+' : '-' }
    accum =  { d => { return;}}
    wheelSpeed = 0
    pointerSpeed = 0
    clickSpeed = 0
    gap = 0
    width ="30%"
  />
  {@render myDigit(100)}
  {@render myDigit(10)}
  {@render myDigit(1)}
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
  width: 25%;
  container-type: inline-size;
  display:flex;
  flex-direction: row;
  font-size: 3em;
  --digit-font-size: 40cqw;
}
</style>
