<script lang="ts">
import Router from 'svelte-spa-router';
import Config from './Config.svelte';
import RigControl from './RigControl.svelte';
import LocalSerial from './LocalSerial.svelte';
import SelectProfile from './SelectProfile.svelte';

const routes = {
  '/' : LocalSerial
, '/rigcontrol' : RigControl
, '/config/*' : Config
, '/config' : Config
, '/serial' : LocalSerial
, '/bi' : SelectProfile
}

</script>

<div>
  <h1> XK852 Rig Control</h1>
  <Router {routes}/>
</div>