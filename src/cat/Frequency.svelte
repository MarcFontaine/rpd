<script lang="ts">
import {rig} from '../state.svelte';
import {setFrequency} from '../cat.ts';

let fset = $derived(rig.frequency);
let f = $state(1500);
let s = $state(100);

function format(f:num) {
  return f.toFixed(2).padStart(8," ")
}

function fsum() {
  const x = s - 100;
  const df = Math.exp(Math.abs(x)/6 - 5 );
  const dfr = Math.sign(x) * Math.trunc(df*100)/100;
  const fn = Math.round((fset+dfr)*100)/100;
  return clamp(fn)
}

function clamp(f) {
  if (f < 1500) return 1500
    else if (f > 29999) return 29999
    else return f;
}

function set(f_unsafe) {
  const f=clamp(f_unsafe);
  setFrequency(1000*f);
}

</script>

<div style="display:flex; flex-direction: column;">
  <span class={rig.frequencyConfirmed? "frequency_confirmed" : "frequency_not_confirmed"} >
    {format(clamp(fsum()))}
  </span>
  
  <input class="slider" type="range" min="0" max="200" bind:value={s}
  oninput={()=> f = fsum()}
  onmouseup={() =>{ const n=fsum(); f=n; s=100; set(n); }}
  >
</div>

<div>
RIT
<br>
XIT
<br>
</div>
<style>

.frequency_confirmed {
  font-family: "Courier New";
  font-size: 9em;
  font-weight: bold;
  white-space: pre;
}

.frequency_not_confirmed {
  font-family: "Courier New";
  font-size: 9em;
  font-weight: lighter;
  white-space: pre;
}

.slider {
  appearance: none;
  width: 50em;
  height: 2em;
  background: #d3d3d3;
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}
</style>