<script lang="ts">
import {rig} from '../state.svelte';
let { d=0, v=10 } = $props();

function inc() {
  rig.frequency=rig.frequency+v;
}

</script>
<button class="frequency_confirmed"
onclick={inc}
>
{d}
</button>
<style>

.frequency_confirmed {
  font-family: "Courier New";
  font-size: 9em;
  font-weight: bold;
  white-space: pre;
}
</style>