<script lang="ts">
import {link} from 'svelte-spa-router'
import active from 'svelte-spa-router/active'
import {settings} from './state.svelte';
</script>

{#if settings.showNavigationBar}
<nav>
<div style="font-size:0.5em;" >
<ul>
  <li>
    <a href="/rigcontrol" use:link use:active={'/rigcontrol'} >CAT</a>
  </li>
  <li>
    <a href="/serial" use:link use:active={'/serial'} >Serial Port</a>
  </li>
  <li>
    <a href="/config" use:link use:active={'/config'} >Config</a>
  </li>
  <li>
    <a href="/settings" use:link use:active={'/settings'} >Settings</a>
  </li>
  <li>
    <a href="/webrtc" use:link use:active={'/webrtc'} >Audio/Video</a>
  </li>
  <li>
    <a href="/hid" use:link use:active={'/aux'} >USB Controller</a>
  </li>
  <li>
    <a href="/debug" use:link use:active={'/debug'} >Debug</a>
  </li>
  <li>
    <a href="/aux" use:link use:active={'/aux'} >Aux</a>
  </li>
  <li>
    <a href="/r" use:link use:active={'/r'} >Row</a>
  </li>
  <li>
    <a href="/c" use:link use:active={'/c'} >Col</a>
  </li>
  <li>
    <a href="/c2" use:link use:active={'/c'} >Col2</a>
  </li>
</ul>
</div>
</nav>
{/if}

<style>
li {
  display:inline;
}
</style>