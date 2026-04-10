<script lang="ts">
import * as Config from '../config/config.svelte'
import { gotoRoot } from '../ui/routes'
</script>

<div>
<h2>Reset Configuration</h2>
<button class="reset-button"
  onclick={ () => Config.reset() }
>
  Delete Rigpage Browser Local Storage
</button>
<br>
<button class="reset-button"
  onclick={ () => gotoRoot() }
>
  Exit without Reset/Delete
</button>
</div>

<style>
.reset-button {
  font-size: 0.5em;
}
</style>