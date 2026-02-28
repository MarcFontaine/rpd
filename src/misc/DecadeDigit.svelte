<script module lang="ts">
  import Option from '../settings/Options.svelte';
  import {ConfigVar, uiOption} from '../config/ConfigVar.svelte';

  export const showDecadeButtons = uiOption(false, 'decadeButtons' );

  export {DecadeSettings};
</script>

{#snippet DecadeSettings()}
<div>
  <Option bind:o={showDecadeButtons.value} d={'Show Up/Down Buttons for Frequency Decade'} />
</div>
{/snippet}


<script lang="ts">

let { isConfirmed, d=0, onDelta } = $props();

let wheelSpeed = $derived(settings.mouseWheelTuningSpeed/200/125);
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

{#if showDecadeButtons.value}
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