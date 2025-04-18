<script lang="ts">
import {settings} from '../state.svelte';
</script>

<div>
  Settings
</div>

<div>
  <br>
    <input type="checkbox" bind:checked={settings.demoMode}> demoMode
  <br>
  <br>
    <input type="checkbox" bind:checked={settings.expertMode}> ExpertMode
  <br>
  <br>
    <input type="checkbox" bind:checked={settings.showSearchBar}> Show Search Bar
  <br>
  <br>
    <input type="checkbox" bind:checked={settings.showNavigationBar}> Show Navigation Bar
  <br>
  <br>
    <input type="checkbox" bind:checked={settings.showDecadeButtons}> Show Up/Down Buttons for Frequency Decade
  <br>
  <br>
    <input type="checkbox" bind:checked={settings.showDecadeButtons}> Set Mobile Mode
  <br>
  <br>
    <input type="checkbox" bind:checked={settings.showPTT}> Show PTT Button
  <br>
  <br>
    <input type="checkbox" bind:checked={settings.smartPTT}> Smart PTT Button
  <br>
  <br>
    <input type="number" bind:value={settings.rigSyncInterval}> Rig Sync Interval
  <br>
  <br>

  {#snippet screen()}
    <option value={'Config'} >Config</option>
    <option value={'RigControl'} >RigControl</option>
    <option value={'Debug'} >Debug</option>
    <option value={'Settings'} >Settings</option>
    <option value={'Empty'} >Empty</option>
  {/snippet}

  Screen 1
  <select bind:value={settings.screen1} >
    {@render screen()}
  </select>

  <br>
  Screen 2
  <select bind:value={settings.screen2} >
    {@render screen()}
  </select>
  <br>
  Screen 3
  <select bind:value={settings.screen3} >
    {@render screen()}
  </select>
  <br>
  Screen 4
  <select bind:value={settings.screen4} >
    {@render screen()}
  </select>
</div>
