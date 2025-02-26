<script lang="ts">
import WebRTCCapture from './WebRTCCapture.svelte';
import WebRTCClient from './WebRTCClient.svelte';
import {gui} from './state.svelte';
</script>

<div hidden={! gui.showWebRTC} >
  <h2>WebRTC Connections</h2>
  <div>
    <WebRTCClient />
  </div>
  <div>
    <WebRTCCapture />
  </div>
</div>