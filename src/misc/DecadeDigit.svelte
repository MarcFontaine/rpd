<script lang="ts">
let { isConfirmed, d=0, onDelta } = $props();

const wheelSpeed = 1/250;
const pointerSpeed = 1/10;

</script>
<button class={isConfirmed? "frequency_confirmed" : "frequency_not_confirmed"}
onwheel={(e)=> {e.preventDefault();onDelta(- e.deltaY * wheelSpeed)}}
onpointerdown={(e)=> {e.preventDefault();onDelta(e.movementY * pointerSpeed)}}
>
{d}
</button>
<style>

.frequency_confirmed {
  font-family: "Courier New";
  font-size: 9em;
  font-weight: normal;
  font-style: normal;
  white-space: pre;
}
.frequency_not_confirmed {
  font-family: "Courier New";
  font-size: 9em;
  font-weight: bold;
  font-style: normal;
  white-space: pre;
}
</style>