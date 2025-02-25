<script lang="ts">
import {rig} from '../state.svelte';
import {setTxOff, setTxOn} from '../cat';
</script>

<div class="ptt">
  <button style="width:50%; font-size:3em;"
    onpointerdown={setTxOn}
    onpointerup={setTxOff}
    onpointercancel={setTxOff} >
    PTT
  </button>

  <div style="width:10%;"></div>   

  <button style="width:20%; font-size:1em;"
    onclick={setTxOff}
  >
    TX OFF
  </button>

  <button style="font-size:1em;"
    onclick={setTxOn}
  >
    TX ON
  </button>
</div>

<style>
.ptt {
  display:flex;
  flex-direction: row;
  width: 100%;
  height: 3.5em;
}
</style>