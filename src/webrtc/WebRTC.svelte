<script lang="ts">
import Capture from './Capture.svelte';
import Client from './Client.svelte';
import {gui} from '../state.svelte';
</script>

<div hidden={! gui.showWebRTC} >
  <h2>WebRTC Connections</h2>
  <div>
    <Client />
  </div>
  <div>
    <Capture />
  </div>
</div>