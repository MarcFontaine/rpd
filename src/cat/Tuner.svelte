<script lang="ts">
import {rig, settings} from '../state.svelte';
import {startAntennaTuning} from '../cat';

{#if settings.showAntennaTuner}
<div>
  <button>
    onclick={startAntennaTuning}
  >
    Start Antenna Tuning
  </button>
</div>
{/if}
