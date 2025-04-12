<script lang="ts">
import ReloadPromt from './misc/ReloadPromt.svelte';
import Error from './misc/Error.svelte';
import Router from 'svelte-spa-router';
import Navigation from './Navigation.svelte';
import WebRTC from './WebRTC.svelte';
import {routes} from './routes';

import {screen} from './state.svelte';
</script>

<Error />
<ReloadPromt />
<div>
  <h1> XK852 Rig Control</h1>
  <Navigation />
  <div>
    <Router {routes}/>
  </div>
</div>
<div>
<WebRTC />
</div>