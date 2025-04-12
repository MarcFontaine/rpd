<script lang="ts">
import ReloadPromt from './misc/ReloadPromt.svelte';
import Error from './misc/Error.svelte';
import Router from 'svelte-spa-router';
import Config from './Config.svelte';
import RigControl from './RigControl.svelte';
import LocalSerial from './LocalSerial.svelte';
import Navigation from './Navigation.svelte';
import WebRTC from './WebRTC.svelte';
import {routes} from './routes';
</script>

<Error />
<ReloadPromt />
<div>
  <h1> XK852 Rig Control</h1>
  <Navigation />
  <Router {routes}/>
</div>
<div>
<WebRTC />
</div>