<script lang="ts">
import DecadeDigit from '../misc/DecadeDigit.svelte';
import {rig} from '../state.svelte';
import {setFrequency} from '../cat';

let digits = $derived.by(()=>{
  let d = [];
  let f = rig.frequency;
  for (let i = 0; i<8; i++) {
    d.push(f % 10);
    f = Math.floor(f/10);
  }
  return d;
}
)



function round(v:number,f:number) {
  return (Math.round(f/v)*v)
}

function clamp(f:number) {
  if (f < 1500000) return 1500000
    else if (f > 29999999) return 29999999
    else return f;
}

function makeOnDelta(v:number) {
  let accum_scroll = 0;
  let last_update = 0;
  const initialFrequency = rig.frequency;
  return (delta:number) => {
    accum_scroll += delta * v;
    const delta_scroll = accum_scroll - last_update;
    if (Math.abs(delta_scroll) >= v) {
      const newFreq = round(v, initialFrequency + delta_scroll);
      last_update += (newFreq - initialFrequency);
      setFrequency(clamp(newFreq));
      }
  }
}

</script>

<div style="display:flex; flex-direction: row;">
<DecadeDigit d={digits[7]} onDelta={makeOnDelta(10000000)}/>
<DecadeDigit d={digits[6]} onDelta={makeOnDelta(1000000)}/>
<DecadeDigit d={digits[5]} onDelta={makeOnDelta(100000)}/>
<DecadeDigit d={digits[4]} onDelta={makeOnDelta(10000)}/>
<DecadeDigit d={digits[3]} onDelta={makeOnDelta(1000)}/>
<div style="font-size: 9em;">
.
</div>
<DecadeDigit d={digits[2]} onDelta={makeOnDelta(100)}/>
<DecadeDigit d={digits[1]} onDelta={makeOnDelta(10)}/>
  
</div>
<style>
</style>