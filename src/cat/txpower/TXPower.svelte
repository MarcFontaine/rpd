<script lang="ts">
import {rig, mobileMode} from '../../state.svelte';
import TXPowerButtons from './Buttons.svelte';
import TXPowerSelect from './Select.svelte';

</script>

<div class="txpower">
{#if mobileMode.value }
  <TXPowerSelect />
{:else}
<details>
  <summary>
    <span style="font-size:1em;">
      Transmit Power: { rig.power ? rig.power : "Unknown Power"}
    </span>
  </summary>
  <TXPowerButtons />
</details>
{/if}
</div>

<style>
.txpower {
  display:flex;
  flex-direction: row;
  width: 100%;
}
</style>