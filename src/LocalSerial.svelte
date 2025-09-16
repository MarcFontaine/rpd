<script lang="ts">
import { currentProfile } from './state.svelte';
import * as Config from './config';
import * as Profile from './profile';
import { isConnected, setRTS, setDTR } from './serial';
</script>

{#if isConnected() }
  <div>
  Disconnect
  <br/>
  <button onclick={() => setRTS(true)}>
    Set RTS High
  </button>
  <br/>
  <button onclick={() => setRTS(false)}>
    Set RTS Low
  </button>
  <br/>
  <button onclick={() => setDTR(true)}>
    Set DTR High
  </button>
  <br/>
  <button onclick={() => setDTR(false)}>
    Set DTR Low
  </button>
  </div>
{:else}
  <div>
  <button
    onclick={() => {
      currentProfile.p = Config.localSerial;
      Profile.initProfile(Config.localSerial)
    }}>
  Connect to a Local Serial Port
  </button>
  </div>
{/if}
