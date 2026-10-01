<script lang="ts">
import { onMount } from 'svelte';
import { toXK852Cmd } from '../cat.ts';
import { type Cmd, CMD, prebuild_cmds, toCBOR } from './cmd.ts';
import { isConnected, tryAutoConnectRigToUsb, connectRigToUsb } from './hidraw.ts';

let isWorkable = $state(false);

onMount(async () => {
  if (!isConnected()) {
    tryAutoConnectRigToUsb()
      .then ((s) => isWorkable = s)
  }
})

</script>
<div>
  <h3>
  Start RigToUsb
  </h3>
<div>
  {#if !isWorkable}
    <button
      onclick={() => { connectRigToUsb() } }
    >
    Connect RigToUsb Device
    </button>
  {/if}
</div>
</div>
