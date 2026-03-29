<script lang="ts">
import {set_OP_MODE_OFF, set_OP_MODE_RX ,set_OP_MODE_TX_LOW,
  set_OP_MODE_TX_MID, set_OP_MODE_TX_FULL } from '../../cat';
</script>
<div class="grid-container">
<button onclick={set_OP_MODE_OFF} >
  Off
</button>

<button onclick={set_OP_MODE_RX} >
  Receive Only
</button>

<button onclick={set_OP_MODE_TX_LOW} >
  TX Low Power
</button>

<button onclick={set_OP_MODE_TX_MID} >
  TX Medium Power
</button>

<button onclick={set_OP_MODE_TX_FULL} >
  TX Full Power
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