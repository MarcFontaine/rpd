<script module lang="ts">
import Option from '../settings/Options.svelte';
import PiGauge from './PiGauge.svelte';
import {espHomeEvent} from '../state.svelte';
export { SWRsettings };
var showSWRMeter = $state(true);

var u_min = $state(0.142);
var u_max = $state(2.6);
var p_max = $state(150);
</script>

<script lang="ts">

let forward = $derived(espHomeEvent.powerForward);
let reverse = $derived(espHomeEvent.powerReverse);

function cal (u:number) {
  const u_normal = (u - u_min) / (u_max - u_min);
  return Math.round(u_normal * u_normal * p_max);
}

</script>

<div style="display:flex; flex-direction: row; width: 100%;" >
  {#if showSWRMeter}
  <div style="display:flex; flex-direction: column; width:50%;" >
    <PiGauge x={cal(forward)*100/p_max} />
    <span> Forward Power: {cal(forward)}W</span>
    <span> raw: {forward}</span>
  </div>
  <div style="display:flex; flex-direction: column; width:50%;" >
    <PiGauge x={cal(reverse)*100/p_max} />
    <span> Reverse Power: {cal(reverse)}W</span>
  </div>
  {/if}
</div>

{#snippet SWRsettings()}
<div>
  <Option bind:o={showSWRMeter} d={'Show SWR Meter'} />
  {#if showSWRMeter}
    <br>
    <input type="number" bind:value={u_min}> Min Sensor Voltage
    <br>
    <input type="number" bind:value={u_max}> Max Sensor Voltage
    <br>
    <input type="number" bind:value={p_max}> Max Reported Power
    <br>
    GUI-test: Reported Forward Power
    <label>
      <input type="range" bind:value={espHomeEvent.powerForward} min="{u_min}" max="{u_max+0.1}" step="0.1"/>
    </label>
    <br>
    GUI-Test: Reported Reverse Power
    <label>
      <input type="range" bind:value={espHomeEvent.powerReverse} min="{u_min}" max="{u_max+0.1}" step="0.1"/>
    </label>
  {/if}
</div>
{/snippet}
