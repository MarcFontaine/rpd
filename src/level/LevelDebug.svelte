<script lang="ts">
import {espHomeEvent} from '../state.svelte';
</script>

<div>
GUI: Reported Forward Power
<label>
	<input type="range" bind:value={espHomeEvent.powerForward} min="0" max="100" />
</label>
</div>

<div>
GUI: Reported Reverse Power
<label>
	<input type="range" bind:value={espHomeEvent.powerReverse} min="0" max="100" />
</label>
</div>

