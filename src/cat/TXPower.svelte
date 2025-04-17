<script lang="ts">
import {rig} from '../state.svelte';
import {set_OP_MODE_OFF, set_OP_MODE_RX ,set_OP_MODE_TX_LOW,
  set_OP_MODE_TX_MID, set_OP_MODE_TX_FULL } from '../cat';
</script>

<div class="txpower">
<details>
  <summary>
    <span style="font-size:1em;">
      Transceiver Power Mode : { rig.power ? rig.power : "undefined"}
    </span>
  </summary>
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
</details>
</div>

<style>
.txpower {
  display:flex;
  flex-direction: row;
  width: 100%;
}

button {
 font-size:1em;
}
</style>