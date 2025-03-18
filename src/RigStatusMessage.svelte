<script lang="ts">
import {rig, log} from './state.svelte';
import {syncRig} from './cat';

const formatter = new Intl.DateTimeFormat('en-US',{
  hourCycle: 'h24',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3
  });

</script>

<div>
  <span><button style="font-size:2em;" onclick={syncRig}>Sync RigStatus</button></span>
  <pre style="font-size:1em;">{rig.returnMsg}</pre>
</div>
