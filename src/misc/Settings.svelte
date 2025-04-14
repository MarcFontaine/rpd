<script lang="ts">
import {settings} from '../state.svelte';
</script>

<div>
  Settings
</div>

<div>
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
  Screen 1
  <select bind:value={settings.screen1} >
    <option value={'RigControl'} >RigControl</option>
    <option value={'Debug'} >Debug</option>
    <option value={'Settings'} >Settings</option>
    <option value={'Empty'} >Empty</option>
  </select>
  <br>
  Screen 2
  <select bind:value={settings.screen2} >
    <option value={'RigControl'} >RigControl</option>
    <option value={'Debug'} >Debug</option>
    <option value={'Settings'} >Settings</option>
    <option value={'Empty'} >Empty</option>
  </select>
  <br>
  Screen 3
  <select bind:value={settings.screen3} >
    <option value={'RigControl'} >RigControl</option>
    <option value={'Debug'} >Debug</option>
    <option value={'Settings'} >Settings</option>
    <option value={'Empty'} >Empty</option>
  </select>
  <br>
  Screen 4
  <select bind:value={settings.screen4} >
    <option value={'RigControl'} >RigControl</option>
    <option value={'Debug'} >Debug</option>
    <option value={'Settings'} >Settings</option>
    <option value={'Empty'} >Empty</option>
  </select>
</div>
