<script lang="ts">
import { getConfig, updateYaml } from '../config/config.svelte';
import { profileName } from '../state.svelte';
import { onMount } from 'svelte';

var currentUrl = $state('');

onMount(() => {
  currentUrl = window.location.href;
  console.log(currentUrl);
});

</script>

<div>
  <div>
    App URL: {currentUrl}
  </div>

  <button
    onclick={()=> { updateYaml.trigger++}}
  >
    Force Update
  </button>
<pre>
{updateYaml.trigger ? getConfig().toString() : ''}
</pre>
</div>

