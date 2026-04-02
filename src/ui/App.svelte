<script lang="ts">
import ReloadPromt from '../misc/ReloadPromt.svelte';
import Navigation from './Navigation.svelte';
import SearchBar from '../bookmarks/SearchBar.svelte';
import WebRTC from '../webrtc/WebRTC.svelte';
import Router from 'svelte-spa-router';
import {routes} from './routes';
import "../app.css";

</script>
<div class="app">
  <div>
    <ReloadPromt />
  </div>
  <div>
    <Router {routes}/>
  </div>
  <div>
    <WebRTC />
  </div>
</div>

<style>
.app {
  display:flex;
  flex-direction: column;
  width: 100%;
  font-size: 2rem;
}
</style>
