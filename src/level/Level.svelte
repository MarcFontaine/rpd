<script lang="ts">
import PiGauge from './PiGauge.svelte';

import {espHomeEvent} from '../state.svelte';

let forward = $derived(espHomeEvent.powerForward);
let reverse = $derived(espHomeEvent.powerReverse);


const u_min = 0.142;
const u_max = 2.6;
const p_max = 150;

function cal (u:number) {
  const u_normal = (u - u_min) / (u_max - u_min);
  return Math.round(u_normal * u_normal * p_max);
}

</script>

<div style="display:flex; flex-direction: row; width: 100%;" >
  <div style="display:flex; flex-direction: column; width:50%;" >
    <PiGauge x={cal(forward)*100/p_max} />
    <span> Power Forward: {cal(forward)}</span>
    <span> raw: {forward}</span>
  </div>
  <div style="display:flex; flex-direction: column; width:50%;" >
    <PiGauge x={cal(reverse)*100/p_max} />
    <span> Power Reverse: {cal(reverse)}</span>
  </div>
</div>