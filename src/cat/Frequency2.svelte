<script lang="ts">
import DecadeDigit from '../misc/DecadeDigit.svelte';
import {rig} from '../state.svelte';
import {setFrequency} from '../cat.ts';

let digits = $derived.by(()=>{
  let d = [];
  let f = rig.frequency;
  for (let i = 0; i<7; i++) {
    d.push(f % 10);
    f = Math.floor(f/10);
  }
  return d;
}
)

</script>

<div style="display:flex; flex-direction: row;">
<DecadeDigit d={digits[6]} v={1000000}/>
<DecadeDigit d={digits[5]} v={100000}/>
<DecadeDigit d={digits[4]} v={10000}/>
<DecadeDigit d={digits[3]} v={1000}/>
<DecadeDigit d={digits[2]} v={100}/>
<div style="font-size: 9em;">
.
</div>
<DecadeDigit d={digits[1]} v={10}/>
<DecadeDigit d={digits[0]} v={1}/>
  
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
</style>