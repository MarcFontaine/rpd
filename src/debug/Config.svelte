<script lang="ts">
import { getConfig } from '../state.svelte';

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

