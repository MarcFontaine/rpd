<script lang="ts">
import Frequency from './cat/Frequency.svelte';
import HID from './hid/HID.svelte';
import PTT from './cat/PTT.svelte';
import TXPower from './cat/txpower/TXPower.svelte';
import Mode from './cat/mode/Mode.svelte';
import Level from './level/Level.svelte';
import AntennaTuner from './cat/AntennaTuner.svelte';
</script>

<div>
  <Frequency />
  <HID />
  <PTT />
  <Mode />
  <TXPower />
  <Level />
  <AntennaTuner />
</div>
