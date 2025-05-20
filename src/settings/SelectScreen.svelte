<script>
import {settings} from '../state.svelte';
let { d, o = $bindable() } = $props();

</script>

<div>
  {d}
  <select class="selectScreen" bind:value={o} >
    <option value={'Config'} >Config</option>
    <option value={'RigControl'} >RigControl</option>
    <option value={'Debug'} >Debug</option>
    <option value={'Settings'} >Settings</option>
    <option value={'FT8'} >FT8</option>
    <option value={'Empty'} >Empty</option>
  </select>
</div>

<style>
.selectScreen {
  font-size: 1em;
}
</style>