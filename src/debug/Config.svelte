<script lang="ts">
import { getConfig } from '../config/config';
import { profileName } from '../state.svelte';
import { onMount } from 'svelte';

var currentUrl = $state('');

onMount(() => {
  currentUrl = window.location.href;
  console.log(currentUrl);
});

var yaml = $state('');

</script>

<div>
  <div>
    App URL: {currentUrl}
  </div>

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

