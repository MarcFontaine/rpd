<script lang="ts">
import {settings} from '../state.svelte';
import Option from './Options.svelte';
import SelectScreen from './SelectScreen.svelte';
import { syncRigDeamon } from '../cat.ts';
import LevelDebug from '../level/LevelDebug.svelte';
</script>

<div>
  Settings
</div>

<div style="display:flex; flex-direction: column; width: 100%;">
  <Option bind:o={settings.demoMode} d={'Demo Mode'} />
  <Option bind:o={settings.mobileMode} d={'Mobile Mode'} />
  <Option bind:o={settings.expertMode} d={'ExpertMode'} />
  <Option bind:o={settings.showSearchBar} d={'Show Search Bar'} />
  <Option bind:o={settings.showNavigationBar} d={'Show Navigation Bar'} />
  <Option bind:o={settings.showDecadeButtons} d={'Show Up/Down Buttons for Frequency Decade'} />
  <Option bind:o={settings.showPTT} d={'Show PTT Button'} />
  <Option bind:o={settings.smartPTT} d={'Smart PTT Button'} />
  <Option bind:o={settings.showAntennaTuner} d={'Antenna Tuner Button'} />

  <br>
    <input type="number" bind:value={settings.rigSyncInterval}
    onchange={syncRigDeamon}
    > TRX Synchronisation Interval (0 = Disable Periodic Sync)
  <br>
    <input type="number" bind:value={settings.mouseWheelTuningSpeed}> Mouse Wheel Tunings Speed
  <br>

  <br>
    <input type="number" bind:value={settings.magnetTuningSpeed}> Hall Rotary Encoder Tunings Speed
  <br>

  <SelectScreen bind:o={settings.screen1} d={'Tile 1'} />
  <SelectScreen bind:o={settings.screen2} d={'Tile 2'} />
  <SelectScreen bind:o={settings.screen3} d={'Tile 3'} />
  <SelectScreen bind:o={settings.screen4} d={'Tile 4'} />
  <br>
  <LevelDebug />
</div>
