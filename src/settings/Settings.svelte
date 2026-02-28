<script lang="ts">
import {expertMode, demoMode, mobileMode, screen1, screen2, screen3, screen4,
  showSearchBar, showNavigationBar, showPTT, smartPTT, showAntennaTuner,
  rigSyncInterval
  } from '../state.svelte';
import Option from './Options.svelte';
import SelectScreen from './SelectScreen.svelte';
import { syncRigDeamon } from '../cat';
import { HIDsettings } from '../hid/HID.svelte';
import { DecadeSettings } from '../misc/DecadeDigit.svelte';
import { ButtonSettings } from '../hid/ButtonSettings.svelte';
import { hidStore } from '../hid/HID.svelte';
import { SWRsettings } from '../level/Level.svelte';
</script>

<div>
  Settings
</div>

<div style="display:flex; flex-direction: column; width: 100%;">
  <Option bind:o={demoMode.value} d={'Demo Mode'} />
  <Option bind:o={mobileMode.value} d={'Mobile Mode'} />
  <Option bind:o={expertMode.value} d={'ExpertMode'} />
  <Option bind:o={showSearchBar.value} d={'Show Search Bar'} />
  <Option bind:o={showNavigationBar.value} d={'Show Navigation Bar'} />
  {@render DecadeSettings()}
  <Option bind:o={showPTT.value} d={'Show PTT Button'} />
  <Option bind:o={smartPTT.value} d={'Smart PTT Button'} />
  <Option bind:o={showAntennaTuner.value} d={'Show Antenna Tuner Button'} />
  {@render HIDsettings()}
  {@render ButtonSettings(hidStore)}
  {@render SWRsettings()}  

  <br>
    <input type="number" bind:value={rigSyncInterval.value}
    onchange={syncRigDeamon}
    > TRX Synchronisation Interval (0 = Disable Periodic Sync)

  <SelectScreen bind:o={screen1.value} d={'Tile 1'} />
  <SelectScreen bind:o={screen2.value} d={'Tile 2'} />
  <SelectScreen bind:o={screen3.value} d={'Tile 3'} />
  <SelectScreen bind:o={screen4.value} d={'Tile 4'} />
  <br>
</div>
