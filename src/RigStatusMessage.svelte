<script lang="ts">
import {rig, log} from './state.svelte';
import {syncRig} from './cat';
import SendXK852Cmd from './SendXK852Cmd.svelte';

let isVerbose = $state(false);

const formatter = new Intl.DateTimeFormat('en-US',{
  hourCycle: 'h24',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3
 });

</script>

<div>
<details>
  <summary>
    <span style="font-size:2em;">RigStatus:
    <span><button style="font-size:0.5em;" onclick={syncRig}>Sync</button></span>
    <br>
    <span style="font-size:0.5em;">{rig.returnMsg}</span>
  </summary>
  <SendXK852Cmd />
  <input type="checkbox" bind:checked={isVerbose}> Verbose
  <br>
  Log Messages:
  <br>
  {#each log.objs.slice(-20).reverse() as l}
    <span>{formatter.format(l.date)}@{l.src}</span>
    <span>{l.msg}</span>
    {#if l.data && isVerbose} <pre> {l.data} </pre>{/if}
    <br>
  {/each}
</details>
</div>


