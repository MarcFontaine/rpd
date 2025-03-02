<script lang="ts">
import {rig} from '../state.svelte';
import {setFrequency} from '../cat';

let { d=0,v } = $props();
let accum_scroll = 0;
let last_update = 0;
const speed = 1/250;

function round(f:number) {
  return (Math.floor(f/v)*v)
}

function clamp(f:number) {
  if (f < 1500000) return 1500000
    else if (f > 29999999) return 29999999
    else return f;
}

</script>
<button class={rig.frequencyConfirmed? "frequency_confirmed" : "frequency_not_confirmed"}
onwheel={(e)=> {
  accum_scroll -= e.deltaY * speed * v;
  const delta_scroll = accum_scroll - last_update;
  const oldFrequency = rig.frequency;
  if (Math.abs(delta_scroll) >= v) {
    const newFreq = round(oldFrequency + delta_scroll);
    last_update += (newFreq - oldFrequency);
    setFrequency(clamp(newFreq));
    }
  }
}
>
{d}
</button>
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
</style>