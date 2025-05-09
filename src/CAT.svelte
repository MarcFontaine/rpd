<script lang="ts">
import Frequency from './cat/Frequency.svelte';
import PTT from './cat/PTT.svelte';
import TXPower from './cat/TXPower.svelte';
import Mode from './cat/mode/Mode.svelte';
import Level from './misc/Level.svelte';
import {gui} from './state.svelte';
</script>

<div>
  <Frequency />
  <PTT />
  <Mode />
  <TXPower />
  <Level />
</div>
