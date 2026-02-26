<script lang="ts">
import { config } from '../state.svelte';
var yaml = $state(config.toString());
</script>
<div>
  <button
    onclick={() => yaml=config.toString()}
  >
  Update YAML
  </button>
  <pre>
    ${yaml}
  </pre>
</div>

