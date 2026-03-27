<script module lang="ts">
  import Option from '../settings/Options.svelte';
  import {ConfigVar, uiOption} from '../config/ConfigVar.svelte';
  export const decadeButtonSplit = uiOption(0, 'decadeButtonSplit' );

  const mouseWheelTuningSpeed = new ConfigVar(
    { default: 100
    , path: [ 'vfo', 'mouseWheel', 'speed' ]
    });

  export {DecadeSettings};
</script>

{#snippet DecadeSettings()}
<div>
  <input
    type="number"
    bind:value={decadeButtonSplit.value}
    min="0"
    max="20"
  >
  Gap between upper and lower decade digits
  <br>
  <input type="number" bind:value={mouseWheelTuningSpeed.value}>
  Mouse Wheel Tunings Speed
</div>

{/snippet}


<script lang="ts">

let { isConfirmed, d=0, onDelta } = $props();

let wheelSpeed = $derived(mouseWheelTuningSpeed.value /200/125);
const pointerSpeed = 1/10;

</script>

{#snippet digit(upperLower)}
   <button
     class={[
         isConfirmed && 'frequency_confirmed',
	 !isConfirmed && 'frequency_not_confirmed',
	 upperLower && 'upper_half_text',
	 !upperLower && 'lower_half_text'	 
       ]}
     onwheel={(e)=> {
       e.preventDefault();onDelta(- e.deltaY * wheelSpeed)}
     }
     onpointerdown={(e)=> {
       e.preventDefault();onDelta(e.movementY * pointerSpeed)}
     }
     onclick={ ()=>onDelta(upperLower ? 1: -1) }
   >
   {d}
   </button>
{/snippet}

<div
  class="button_container"
  style:gap="{decadeButtonSplit.value}px"
>
  {@render digit(true)}
  {@render digit(false)}  
</div>

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

.button_container {
    display: flex;
    flex-direction: column;
    touch-action: none;
    overflow: hidden;
}

.upper_half_text {
    height: 0.5em;
    display: flex;
    line-height: 1em;
    align-items: flex-start;
}

.lower_half_text {
    height: 0.5em;
    display: flex;
    line-height: 1em;
    align-items: flex-end;
}
  
</style>