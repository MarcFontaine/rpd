<script lang="ts">
import {replace} from 'svelte-spa-router'
import SearchBar from './SearchBar.svelte';
import CAT from './CAT.svelte';
import WebRTCCapture from './WebRTCCapture.svelte';
import WebRTCClient from './WebRTCClient.svelte';
import About from './About.svelte';
</script>

<div>
  <div>
  <SearchBar />
  </div>
  <div>
  <CAT />
  </div>
</div>

<details>
  <summary>
  <span style="font-size:2em;">
    More
  </span>
  </summary>
  <div>
    <WebRTCClient />
  </div>
  <div>
    <WebRTCCapture />
  </div>
  <div>
    <About />
  </div>
</details>