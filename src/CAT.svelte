<script lang="ts">
import Frequency from './cat/Frequency.svelte';
import PTT from './cat/PTT.svelte';
import TXPower from './cat/TXPower.svelte';
import Mode from './cat/Mode.svelte';
import RigStatusMessage from './RigStatusMessage.svelte';
import {gui} from './state.svelte';
</script>

<div>
  <Frequency />
  <PTT />
  <Mode />
  <TXPower />
  <RigStatusMessage />
</div>
