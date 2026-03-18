<script lang="ts">
import {rig, mobileMode} from '../../state.svelte';
import ModeButtons from './ModeButtons.svelte';
import ModeSelect from './ModeSelect.svelte';
</script>

<div class="mode">
{#if mobileMode.value }
  <ModeSelect />
{:else}
  <details>
    <summary>
      <span style="font-size:1em;">
	 Mode: { rig.mode ? rig.mode : "Unknown Mode"}
      </span>
    </summary>
    <ModeButtons />
  </details>
{/if}
</div>
<style>

.mode {
  display:flex;
  flex-direction: row;
  width: 100%;
}
</style>