<script lang="ts">
import {DownloadConfig} from './Config.svelte';
let {params} = $props();
let args = $state({
  url: (params && params.wild) ? params.wild : '',
  username: '',
  password: ''
  });
</script>

<div>
  <h2>
    Download Configuration from Server
  </h2>
  <div>
  {@render DownloadConfig(args)}
  </div>
</div>  
