<script lang="ts">
import {set_MODE_AME, set_MODE_USB ,set_MODE_LSB,
  set_MODE_CW } from '../../cat';
</script>
<div class="grid-container">
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

</div>

<style>
button {
 font-size:1em;
}
.grid-container {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
</style>