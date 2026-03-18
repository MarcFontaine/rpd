<script module lang="ts">
import { replace } from 'svelte-spa-router'
import {expertMode, demoMode, mobileMode, screen1, screen2, screen3, screen4,
  showSearchBar, showNavigationBar, showPTT, smartPTT, showAntennaTuner,
  rigSyncInterval, webserial_enable, rigctld_enable, rigctld_wss, profileName
  } from '../state.svelte';
import * as Config from '../config/config.svelte';
import Option from './Options.svelte';
import SelectScreen from './SelectScreen.svelte';
import { syncRigDeamon } from '../cat';
import { HIDsettings } from '../hid/HID.svelte';
import { DecadeSettings } from '../misc/DecadeDigitSplit.svelte';
import { ButtonSettings } from '../hid/ButtonSettings.svelte';
import { hidStore } from '../hid/HID.svelte';
import { SWRsettings } from '../level/Level.svelte';
import { WebRtcSettings } from '../webrtc/Settings.svelte';
</script>

<div>
  Config
</div>

<div style="display:flex; flex-direction: column; width: 100%;">
  <details>
    <summary>
      Profile
    </summary>
    <input type="text" size="40" bind:value={profileName.value}>
    Profile Name
  </details>
  <details>
    <summary>
      User Interface Look and Feel
    </summary>
    <Option bind:o={mobileMode.value} d={'Mobile Mode'} />
    <Option bind:o={expertMode.value} d={'ExpertMode'} />
    <Option bind:o={showSearchBar.value} d={'Show Search Bar'} />
    <Option bind:o={showNavigationBar.value} d={'Show Navigation Bar'} />
    <SelectScreen bind:o={screen1.value} d={'Tile 1'} />
    <SelectScreen bind:o={screen2.value} d={'Tile 2'} />
    <SelectScreen bind:o={screen3.value} d={'Tile 3'} />
    <SelectScreen bind:o={screen4.value} d={'Tile 4'} />
    {@render DecadeSettings()}
    {@render HIDsettings()}
  </details>
  <details>
    <summary>
      USB Control Box Buttons
    </summary>
    {@render ButtonSettings(hidStore)}
  </details>
  <details>
    <summary>
      SWR Meter
    </summary>
    {@render SWRsettings()}
  </details>
  <details>
    <summary>
      CAT Control
    </summary>
    <Option bind:o={demoMode.value} d={'No Cat Connection / Demo Mode'} />
    <Option bind:o={webserial_enable.value} d={'Connect Local Serial Port'} />
    <Option bind:o={rigctld_enable.value} d={'Connect to rigctld Websocket Server'} />
    <input type="text" size="80" bind:value={rigctld_wss.value}>
    rigctld Server URL
    <br>
    <input type="number" bind:value={rigSyncInterval.value}
      onchange={syncRigDeamon}
    > TRX Synchronisation Interval (0 = Disable Periodic Sync)

    <br>
    <Option bind:o={showPTT.value} d={'Show PTT Button'} />
    <Option bind:o={smartPTT.value} d={'Smart PTT Button'} />
    <Option bind:o={showAntennaTuner.value} d={'Show Antenna Tuner Button'} />
  </details>
  <details>
    <summary>
      Remote Audio (WebRTC)
    </summary>
    {@render WebRtcSettings()}
  </details>
  <details>
    <summary>
      Import Export Configuration
    </summary>
    <button
      onclick={ () => replace('/download') }
    >
       Download Configuration from Server
    </button>
  </details>
  <br>
  <button
    onclick= { () => {
      Config.updateSettings();
      Config.saveToLocalStorage();
      }
    }
  >
     Save Config
  </button>
  <br>

</div>
