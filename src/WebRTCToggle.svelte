<script lang="ts">
import { onMount } from 'svelte';
import {gui} from './state.svelte';


onMount(() => {
  gui.showWebRTC = true;
  return () => gui.showWebRTC = false
});

</script>
<div>
</div>