<script lang="ts">
import { onMount } from 'svelte';
import {showWebRTC} from './webrtc';

onMount(() => {
  showWebRTC.value = true;
  return () => showWebRTC.value = false
});

</script>
<div>
</div>