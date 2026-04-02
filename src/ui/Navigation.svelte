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
  <a href="/serial" use:link use:active={'/serial'} >Serial Port</a>
  <a href="/download" use:link use:active={'/download'} >Download Config</a>
  <a href="/rig/rigcontrol" use:link use:active={'/rigcontrol'} >CAT</a>
  <a href="/rig/settings" use:link use:active={'/rig/settings'} >
    <span class="icon">⚙️</span>
    <span class="label">Settings</span>
  </a>
  <a href="/rig/webrtc" use:link use:active={'/rig/webrtc'} >Audio/Video</a>
  <a href="/rig/debug" use:link use:active={'/rig/debug'} >Debug</a>
  <a href="/rig/ft8" use:link use:active={'/rig/ft8'} >FT8</a>
  <a href="/rig/r" use:link use:active={'/rig/r'} >Row</a>
  <a href="/rig/c" use:link use:active={'/rig/c'} >Col</a>
  <a href="/rig/c2" use:link use:active={'/rig/c'} >Col2</a>
</div>
</nav>
{/if}

<style>
.grid-container {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 5px;
}
.grid-container a {
  box-sizing: border-box;
  display: iblock;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-name {
  grid-column: span 2;
  position: relative;
  min-width: 0;
  overflow: hidden;
  display: flex;
}
.icon { font-size: 1em; }
</style>
