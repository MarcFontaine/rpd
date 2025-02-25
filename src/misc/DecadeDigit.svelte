<script lang="ts">
import {rig} from '../state.svelte';
let { d=0, v=10 } = $props();

function inc() {
  rig.frequency=rig.frequency+v;
}

</script>
<div class="frequency_confirmed"
onclick={inc}
>
{d}
</div>
<style>

.frequency_confirmed {
  font-family: "Courier New";
  font-size: 9em;
  font-weight: bold;
  white-space: pre;
}

.frequency_not_confirmed {
  font-family: "Courier New";
  font-size: 9em;
  font-weight: lighter;
  white-space: pre;
}
</style>