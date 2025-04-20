<script lang="ts">
import DecadeDigit from '../misc/DecadeDigit.svelte';
import {gui,rig} from '../state.svelte';
import {setFrequencyRateLimited} from '../cat';

// When editMode== true, the GUI shows the frequency as being edited.
// The GUI stays in editMode for 5000ms == 5 seconds after last the edit.
// After 5 seconds the GUI shows the frequency as it is reported by the rig.

let editMode = $derived(Date.now() - gui.frequency.time < 5000);

let frequency = $derived.by(()=> {
  if ( rig.time > gui.frequency.time && ! editMode)
    return rig.frequency;
    else return gui.frequency.value;
  });

let isConfirmed = $derived.by(() => {
  return frequency == rig.frequency;
  });

let digits = $derived.by(()=>{
  let d = [];
  let f = frequency;
  for (let i = 0; i<8; i++) {
    d.push(f % 10);
    f = Math.floor(f/10);
  }
  return d;
  }
  );

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
  const initialFrequency = frequency;
  return (delta:number) => {
    accum_scroll += delta * v;
    const delta_scroll = accum_scroll - last_update;
    if (Math.abs(delta_scroll) >= v) {
      const newFreq = round(v, initialFrequency + delta_scroll);
      last_update += (newFreq - initialFrequency);
      setFrequencyRateLimited(clamp(newFreq));
      }
  }
}

</script>
<div style="display:flex; flex-direction: column;">
  <div class="decade" >
    <DecadeDigit isConfirmed={isConfirmed} d={digits[7]} onDelta={makeOnDelta(10000000)}/>
    <DecadeDigit isConfirmed={isConfirmed} d={digits[6]} onDelta={makeOnDelta(1000000)}/>
    <DecadeDigit isConfirmed={isConfirmed} d={digits[5]} onDelta={makeOnDelta(100000)}/>
    <DecadeDigit isConfirmed={isConfirmed} d={digits[4]} onDelta={makeOnDelta(10000)}/>
    <DecadeDigit isConfirmed={isConfirmed} d={digits[3]} onDelta={makeOnDelta(1000)}/>
    <div> . </div>
    <DecadeDigit isConfirmed={isConfirmed} d={digits[2]} onDelta={makeOnDelta(100)}/>
    <DecadeDigit isConfirmed={isConfirmed} d={digits[1]} onDelta={makeOnDelta(10)}/>
  </div>
  test 1 2 t
</div>

<style>
.decade {
  display:flex;
  flex-direction: row;
  font-size: 3em;
}
</style>
