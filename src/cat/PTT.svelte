<script lang="ts">
import { XK852Power } from '../types';
import {rig, showPTT, smartPTT} from '../state.svelte';
import {setTxOff, setTxOn} from '../cat';

let isSafe = $derived(
   (  rig.power == XK852Power.Low
   || rig.power == XK852Power.Mid
   || rig.power == XK852Power.Full
   )
//  && isAmateurBand(rig.Frequency)
);

let isDisabled = $derived( smartPTT.value && !isSafe) ;

</script>

{#if showPTT.value}
<div class="ptt">
  <button class={{ isDisabled }} style="width:40%; font-size:1em;"
    onpointerdown={setTxOn}
    onpointerup={setTxOff}
    onpointercancel={setTxOff} >
    oncontextmenu={e => {e.preventDefault; e.stopPropagation} }
    PTT
  </button>
  <div style="width:10%"></div>
  <button class={{ isDisabled }} style="width:10%; font-size:1em;"
    onclick={setTxOn}
  >
    TX ON
  </button>
  <div style="width:10%"></div>
  <button style="width:30%; font-size:1em;"
    onclick={setTxOff}
  >
    TX OFF
  </button>

</div>
{/if}

<style>
.ptt {
  display:flex;
  flex-direction: row;
  width: 100%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.isDisabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>