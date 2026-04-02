<script lang="ts">
import Router from 'svelte-spa-router';
import {subroutes} from './routes';

import Error from '../misc/Error.svelte';
import Navigation from './Navigation.svelte';
import SearchBar from '../bookmarks/SearchBar.svelte';
</script>

<div>
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
    <Router routes={subroutes} prefix="/rig"/>
  </div>
</div>
