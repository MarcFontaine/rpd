<script lang="ts">
import {rig} from '../state.svelte';
import {setFrequency} from '../cat';

let { d=0,onDelta } = $props();

const wheelSpeed = 1/250;
const pointerSpeed = 1/10;

</script>
<button class={rig.frequencyConfirmed? "frequency_confirmed" : "frequency_not_confirmed"}
onwheel={(e)=> onDelta(- e.deltaY * wheelSpeed)}
onpointerdown={(e)=> {console.log(e);onDelta(e.movementY * pointerSpeed)}}
>
{d}
</button>
<style>

.frequency_confirmed {
  font-family: "Courier New";
  font-size: 9em;
  font-weight: bold;
  white-space: pre;
  touch-action: none;
}
.frequency_not_confirmed {
  font-family: "Courier New";
  font-size: 9em;
  font-weight: lighter;
  white-space: pre;
  touch-action: none;  
}
</style>