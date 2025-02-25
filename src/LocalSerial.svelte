<script lang="ts">
import { currentProfile} from './state.svelte';
import * as Config from './config';
import * as Profile from './profile';
</script>

<div>
<button
  onclick={() => {
    currentProfile.p = Config.localSerial;
    Profile.initProfile(Config.localSerial)
  }}>
Connect to a Local Serial Port
</button>
</div>