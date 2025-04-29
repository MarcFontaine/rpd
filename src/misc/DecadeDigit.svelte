<script lang="ts">
import {settings} from '../state.svelte';

let { isConfirmed, d=0, onDelta } = $props();

let wheelSpeed = $derived(settings.mouseWheelTuningSpeed/100/125);
const pointerSpeed = 1/10;

</script>

{#snippet digit()}
   <button class={isConfirmed? "frequency_confirmed" : "frequency_not_confirmed"}
   onwheel={(e)=> {e.preventDefault();onDelta(- e.deltaY * wheelSpeed)}}
   onpointerdown={(e)=> {e.preventDefault();onDelta(e.movementY * pointerSpeed)}}
   >
   {d}
   </button>
{/snippet}

{#if settings.showDecadeButtons}
<div style="display:flex; flex-direction: column;">
  <button class="updown"
  onclick={()=>onDelta(1)}
  >
  &#x2303
  </button>
  {@render digit()}
  <button class="updown"
  onclick={()=>onDelta(-1)}
  >
  &#x2304
  </button>
</div>
{:else}
{@render digit()}
{/if}
<style>

.frequency_confirmed {
  font-family: "Courier New";
  font-size: 1em;
  font-weight: normal;
  font-style: normal;
  white-space: pre;
  padding: 0px 0px;
  margin: 0px 0px 0px 0px;
  border-width: 0px;
}
.frequency_not_confirmed {
  font-family: "Courier New";
  font-size: 1em;
  font-weight: bold;
  font-style: normal;
  white-space: pre;
  padding: 0px 0px;
  margin: 0px 0px 0px 0px;
  border-width: 0px;
}
.updown {
  font-family: "Courier New";
  font-size: 0.25em;
  font-weight: bold;
  font-style: normal;
  white-space: pre;
  padding: 0px 0px;
  margin: 0px 0px 0px 0px;
  border-width: 0px;
}
</style>