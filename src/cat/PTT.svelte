<script lang="ts">
import { XK852Power } from '../types';
import {rig, settings} from '../state.svelte';
import {setTxOff, setTxOn} from '../cat';

let isSafe = $derived(
   (  rig.power == XK852Power.Low
   || rig.power == XK852Power.Mid
   || rig.power == XK852Power.Full
   )
//  && isAmateurBand(rig.Frequency)
);

let isDisabled = $derived( settings.smartPTT && !isSafe) ;

</script>

{#if settings.showPTT}
<div class="ptt" >
  <button class={{ isDisabled }} style="width:50%; font-size:1em;"
    onpointerdown={setTxOn}
    onpointerup={setTxOff}
    onpointercancel={setTxOff} >
    PTT
  </button>
</div>

<div class="ptt" >
  <button style="width:20%; font-size:0.5em;"
    onclick={setTxOff}
  >
    TX OFF
  </button>
  <div style="width:20%;"></div>

  <button class={{ isDisabled }} style="width:10%; font-size:0.5em;"
    onclick={setTxOn}
  >
    TX ON
  </button>

</div>
{/if}

<style>
.ptt {
  display:flex;
  flex-direction: row;
  width: 100%;
  height: 1.5em;
}

.isDisabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>