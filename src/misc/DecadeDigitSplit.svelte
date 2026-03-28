<script lang="ts">

let { isConfirmed, d=0, onDeltaWheel, onDeltaPointer, onDeltaClick, gap } = $props();

</script>

{#snippet digit(upperLower)}
   <button
     class={[
         isConfirmed && 'frequency_confirmed',
	 !isConfirmed && 'frequency_not_confirmed',
	 upperLower && 'upper_half_text',
	 !upperLower && 'lower_half_text'	 
       ]}

    onwheel = {onDeltaWheel}
    onpointerdown = {onDeltaPointer}
    onclick = { () => onDeltaClick(upperLower ? 1: -1) }
   >
   {d}
   </button>
{/snippet}

<div
  class="button_container"
  style:gap="{gap}px"
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
    overflow: hidden;
}

.lower_half_text {
    height: 0.5em;
    display: flex;
    line-height: 1em;
    align-items: flex-end;
    overflow: hidden;
}
  
</style>