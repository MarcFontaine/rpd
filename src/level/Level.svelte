<script lang="ts">
import PiGauge from './PiGauge.svelte';

import {espHomeEvent} from '../state.svelte';

let forward=$derived(espHomeEvent.powerForward);
let reverse=$derived(espHomeEvent.powerReverse);

</script>

<div style="display:flex; flex-direction: row; width: 100%;" >
  <div style="display:flex; flex-direction: column;" >
    <PiGauge x={forward} />
    <span> Power Forward: {forward}</span>
  </div>
  <div style="display:flex; flex-direction: column;" >
    <PiGauge x={reverse} />
    <span> Power Reverse: {reverse}</span>
  </div>
</div>