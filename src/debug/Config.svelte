<script lang="ts">
import { config } from '../state.svelte';
import { allToYaml } from '../config/ConfigVar.svelte';

var yaml = $state('');
</script>
<div>
  <button
    onclick={() => {
      allToYaml();
      yaml = config.toString();
    }}
  >
  Update YAML
  </button>
  <pre>
    {yaml}
  </pre>
</div>

