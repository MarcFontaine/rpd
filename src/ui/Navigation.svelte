<script lang="ts">
import {link} from 'svelte-spa-router'
import active from 'svelte-spa-router/active'
import {showNavigationBar} from '../state.svelte';
import { profileName } from '../state.svelte';
</script>

{#if showNavigationBar.value}
<nav>
<div class="grid-container" style="font-size:1em;" >
  <div class="profile-name">
    {profileName.value}
  </div>
  <a href="/rigcontrol" use:link use:active={'/rigcontrol'} >CAT</a>
  <a href="/serial" use:link use:active={'/serial'} >Serial Port</a>
  <a href="/download" use:link use:active={'/download'} >Download Config</a>
  <a href="/settings" use:link use:active={'/settings'} >Settings</a>
  <a href="/webrtc" use:link use:active={'/webrtc'} >Audio/Video</a>
  <a href="/debug" use:link use:active={'/debug'} >Debug</a>
  <a href="/ft8" use:link use:active={'/ft8'} >FT8</a>
  <a href="/r" use:link use:active={'/r'} >Row</a>
  <a href="/c" use:link use:active={'/c'} >Col</a>
  <a href="/c2" use:link use:active={'/c'} >Col2</a>
</div>
</nav>
{/if}

<style>
.grid-container {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 5px;
}
.grid-container a {
  box-sizing: border-box;
  display: iblock;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
}
.profile-name {
  grid-column: span 2;
  position: relative;
  min-width: 0;
  overflow: hidden;
  display: flex;
}
</style>