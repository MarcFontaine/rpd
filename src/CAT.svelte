<script lang="ts">
import Frequency from './cat/Frequency.svelte';
import BFO from './cat/BFO.svelte';
import HID from './hid/HID.svelte';
import Mode from './cat/mode/Mode.svelte';
import Level from './level/Level.svelte';
import StatusBar from './status/StatusBar.svelte';
</script>

<div>
  <StatusBar />
  <Frequency />
  <HID />
  <Mode />
  <Level />
  <BFO />
</div>
