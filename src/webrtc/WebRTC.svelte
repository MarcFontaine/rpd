<script module lang="ts">
  export const state = $state({showWebRTC:false} );
</script>

<script lang="ts">
import Capture from './Capture.svelte';
import Client from './Client.svelte';
</script>

<div hidden={! state.showWebRTC }>
  <h2>WebRTC Connections</h2>
  <div>
    <Client />
  </div>
  <div>
    <Capture />
  </div>
</div>