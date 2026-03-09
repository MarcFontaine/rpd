<script lang="ts">
import { getConfig } from '../config/config';
import { profileName } from '../state.svelte';

var yaml = $state('');
</script>

<div>
  <h4>
  Profile Name: {profileName.value}
  </h4>
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

