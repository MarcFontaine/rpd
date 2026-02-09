<script lang="ts">
import {rig, settings} from '../../state.svelte';
import ModeButtons from './ModeButtons.svelte';
import ModeSelect from './ModeSelect.svelte';
</script>

<div class="mode">
<span style="font-size:1em;">
	Mode: {rig.mode}
</span>
{#if settings.mobileMode }

  <ModeSelect />
{:else}
  <details>
    <summary>
      <span style="font-size:1em;">
	 Mode: {rig.mode}
      </span>
    </summary>
    <ModeButtons />
  </details>
{/if}
</div>
