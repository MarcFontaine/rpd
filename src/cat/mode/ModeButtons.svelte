<script lang="ts">
import {set_MODE_AME, set_MODE_USB ,set_MODE_LSB,
  set_MODE_CW, set_MODE_ISB,
  set_MODE_FSK_LP, set_MODE_FSK_MID, set_MODE_FSK_HP } from '../../cat';
</script>

<button onclick={set_MODE_AME} >
  AME
</button>

<button onclick={set_MODE_USB} >
  USB
</button>

<button onclick={set_MODE_LSB} >
  LSB
</button>

<button onclick={set_MODE_CW} >
  CW
</button>

<button onclick={set_MODE_ISB} >
  ISB
</button>

<button onclick={set_MODE_FSK_LP} >
  FSK Low Power
</button>

<button onclick={set_MODE_FSK_MID} >
  FSK Medium Power
</button>

<button onclick={set_MODE_FSK_HP} >
  FSK High Power
</button>

<style>
button {
 font-size:1em;
}
</style>