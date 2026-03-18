<script lang="ts">
import { XK852Power } from '../../types';
import { rig } from '../../state.svelte';
import { setOpMode } from '../../cat';

let selected = $derived(rig.power);

</script>

<select
  bind:value={selected}
  onchange={() => {
    setOpMode(selected);
    }
  }
>
  <option value={null} selected disabled hidden>
    Unknown power mode
  </option>
  <option value={XK852Power.Off} > Off </option>
  <option value={XK852Power.RxOnly} > Receive Only </option>
  <option value={XK852Power.Low} > Low Power </option>
  <option value={XK852Power.Mid} > Medium Power </option>
  <option value={XK852Power.Full} > Full Power </option>
</select>
