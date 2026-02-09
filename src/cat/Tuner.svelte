<script lang="ts">
import {rig, settings} from '../state.svelte';
import {triggerAntennaTuner} from '../cat';
</script>

{#if settings.showAntennaTuner}
<div>
  <button>
    onclick={triggerAntennaTuner}
  >
    Start Antenna Tuning
  </button>
</div>
{/if}
