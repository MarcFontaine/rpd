<script lang="ts">
import {showAntennaTuner} from '../state.svelte';
import {triggerAntennaTuner} from '../cat';
</script>

{#if showAntennaTuner.value}
<div>
  <button style="font-size:1em;"
    onclick={triggerAntennaTuner}
  >
    Start Antenna Auto Tuner
  </button>
</div>
{/if}
