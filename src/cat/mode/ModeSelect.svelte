<script lang="ts">
import { XK852Mode } from '../../types';
import { rig } from '../../state.svelte';
import { setMode } from '../../cat';

let selected = $derived(rig.mode);

</script>

<select
  bind:value={selected}
  onchange={() => {
    setMode(selected);
    }
  }
>
  <option value={null} selected disabled hidden>
    Unknown mode
  </option>
  <option value={XK852Mode.AME} > AME </option>
  <option value={XK852Mode.USB} > USB </option>
  <option value={XK852Mode.LSB} > LSB </option>
  <option value={XK852Mode.CW} > CW </option>
  <option value={XK852Mode.ISB} > ISB </option>
  <option value={XK852Mode.FSK_LP} > FSK Low Power </option>
  <option value={XK852Mode.FSK_MP} > FSK Medium Power </option>
  <option value={XK852Mode.FSK_HP} > FSK High Power </option>
</select>
<style>
select {
/*  appearance: none;
  -webkit-appearance: none;
  width: 100%;
*/
  font-size:1em;
/*
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  min-height: 48px;
*/
}
</style>