<script lang="ts">
import ReloadPromt from './misc/ReloadPromt.svelte';
import Error from './misc/Error.svelte';
import Navigation from './Navigation.svelte';
import SearchBar from './SearchBar.svelte';
import Router from 'svelte-spa-router';
import WebRTC from './WebRTC.svelte';
import {routes} from './routes';
</script>
<div style="flex-direction: column;">
  <div>
    <ReloadPromt />
  </div>
  <div style="max-height: 10em; overflow-y: scroll;background-color:red; " >
    <Error />
  </div>
  <div>
    <Navigation />
  </div>
  <div>
    <SearchBar />
  </div>
  <div>
    <Router {routes}/>
  </div>
  <div>
    <WebRTC />
  </div>
</div>