<script lang="ts">
import {showOnOffButton} from '../state.svelte';
</script>

{#if showOnOffButton.value}
<div>
  <button>
    Turn the Radio On
  </button>
</div>
{/if}
