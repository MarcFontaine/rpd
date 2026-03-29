<script module lang="ts">
  import Option from '../settings/Options.svelte';
  import {ConfigVar, uiOption} from '../config/ConfigVar.svelte';
  export const buttonSplit = uiOption(0, 'decadeButtonSplit' );

  export const mouseWheelTuningSpeed = new ConfigVar(
    { default: 100
    , path: [ 'vfo', 'mouseWheel', 'speed' ]
    });

  export const rounding = new ConfigVar(
    { default: true
    , path: [ 'vfo', 'decade', 'rounding' ]
    });

  export {DecadeSettings};
</script>


{#snippet DecadeSettings()}
<div>
  <input
    type="number"
    bind:value={buttonSplit.value}
    min="0"
    max="20"
  >
  Gap between upper and lower decade digits
  <br>
  <input type="number" bind:value={mouseWheelTuningSpeed.value}>
  Mouse Wheel Tunings Speed
  <Option bind:o={rounding.value} d={'Auto Rounding of VFO frequency '} />
</div>
{/snippet}
