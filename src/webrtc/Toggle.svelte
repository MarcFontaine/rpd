<script lang="ts">
import { onMount } from 'svelte';
import { state } from './WebRTC.svelte';

onMount(() => {
  state.showWebRTC = true;
  return () => state.showWebRTC = false
});

</script>
<div>
</div>