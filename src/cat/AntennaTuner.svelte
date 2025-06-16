<script lang="ts">
import {rig, settings} from '../state.svelte';
import {triggerAntennaTuner} from '../cat';
</script>

{#if settings.showAntennaTuner}
<div>
  <button style="font-size:1em;"
    onclick={triggerAntennaTuner}
  >
    Start Antenna Auto Tuner
  </button>
</div>
{/if}
