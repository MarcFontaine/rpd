<script lang="ts">
import { getConfig } from '../state.svelte';
import { allToYaml } from '../config/ConfigVar.svelte';

var yaml = $state('');
</script>
<div>
  <button
    onclick={() => {
      yaml = getConfig().toString();
    }}
  >
  Update YAML
  </button>
<pre>
{yaml}
</pre>
</div>

