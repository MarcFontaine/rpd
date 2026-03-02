<script module lang="ts">
import Option from '../settings/Options.svelte';
import PiGauge from './PiGauge.svelte';
import {espHomeEvent} from '../state.svelte';
import { ConfigVar } from '../config/ConfigVar.svelte';

export { SWRsettings };

</script>

<script lang="ts">
import {u_min, u_max, p_max, showSwrMeter, espSwrMeterEnable, espSwrMeterUrl} from './level-settings';
let forward = $derived(espHomeEvent.powerForward);
let reverse = $derived(espHomeEvent.powerReverse);

function cal (u:number) {
  const u_normal = (u - u_min.value) / (u_max.value - u_min.value);
  return Math.round(u_normal * u_normal * p_max.value);
}

</script>

<div style="display:flex; flex-direction: row; width: 100%;" >
  {#if showSwrMeter.value}
  <div style="display:flex; flex-direction: column; width:50%;" >
    <PiGauge x={ cal(forward)*100/p_max.value } />
    <span> Forward Power: {cal(forward)}W</span>
    <span> raw: {forward}</span>
  </div>
  <div style="display:flex; flex-direction: column; width:50%;" >
    <PiGauge x={cal(reverse)*100/p_max.value} />
    <span> Reverse Power: {cal(reverse)}W</span>
  </div>
  {/if}
</div>

{#snippet SWRsettings()}
<div>
  <Option bind:o={showSwrMeter.value} d={'Show SWR Meter'} />
  {#if showSwrMeter.value}
    <br>
    <input type="number" bind:value={u_min.value}> Min Sensor Voltage
    <br>
    <input type="number" bind:value={u_max.value}> Max Sensor Voltage
    <br>
    <input type="number" bind:value={p_max.value}> Max Reported Power
    <br>
    <Option bind:o={espSwrMeterEnable.value} d={'Connect to ESP SWR Meter'} />
    <br>
    <input type="text" bind:value={espSwrMeterUrl.value}> ESP SWR Meter URL
    <br>
    GUI-test: Reported Forward Power
    <label>
      <input type="range" bind:value={espHomeEvent.powerForward} min="{u_min.value}" max="{u_max.value+0.1}" step="0.1"/>
    </label>
    <br>
    GUI-Test: Reported Reverse Power
    <label>
      <input type="range" bind:value={espHomeEvent.powerReverse} min="{u_min.value}" max="{u_max.value + 0.1}" step="0.1"/>
    </label>
  {/if}
</div>
{/snippet}
