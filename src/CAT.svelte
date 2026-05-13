<script lang="ts">
import Frequency from './cat/Frequency.svelte';
import BFO from './cat/BFO.svelte';
import HID from './hid/HID.svelte';
import PTT from './cat/PTT.svelte';
import TXPower from './cat/txpower/TXPower.svelte';
import Mode from './cat/mode/Mode.svelte';
import Level from './level/Level.svelte';
import AntennaTuner from './cat/AntennaTuner.svelte';
import StatusBar from './status/StatusBar.svelte';
</script>

<div>
  <StatusBar />
  <Frequency />
  <HID />
  <PTT />
  <Mode />
  <TXPower />
  <Level />
  <AntennaTuner />
  <BFO />
</div>
