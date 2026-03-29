<script module>
  export { renderSign };
</script>

<script lang="ts">
let { isConfirmed, v, exp, accum, wheelSpeed, pointerSpeed, clickSpeed
    , gap }= $props();

let d = $derived(Math.floor(Math.abs(v)/exp) - Math.floor(Math.abs(v)/exp/10)*10);

</script>

{#snippet digit(upperLower)}
   <button
     class={[
         isConfirmed && 'frequency_confirmed',
	 !isConfirmed && 'frequency_not_confirmed',
	 upperLower && 'upper_half_text',
	 !upperLower && 'lower_half_text'	 
       ]}

    onwheel = {(e) => {
      e.preventDefault();
      accum(- e.deltaY * wheelSpeed);
    }}
    onpointerdown = {(e) => {
      e.preventDefault();
      accum(e.movementY * pointerSpeed)
    }}
    onclick = { () => {
      accum(upperLower ? clickSpeed: -clickSpeed)
    }}
   >
   {d}
   </button>
{/snippet}

{#snippet renderSign(s)}
<div class="button_container">
  <button
    class={ ['frequency_confirmed' ,'upper_half_text'] }
  >
  {s}
  </button>
  <button
    class={ ['frequency_confirmed' ,'lower_half_text'] }
  >
  {s}
  </button>
</div>
{/snippet}

<div class="button_container">
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
    flex: 0 0 auto;
    min-width: fit-content;
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