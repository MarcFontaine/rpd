<script lang="ts">
import {rig, log} from '../state.svelte';
import {syncRig} from '../cat';
import SendXK852Cmd from '../SendXK852Cmd.svelte';
import RigStatusMessage from '../RigStatusMessage.svelte';
import About from './About.svelte';
import EspHome from '../aux/EspHome.svelte';

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
  <About />
</div>
<div>
  <RigStatusMessage />
  <SendXK852Cmd />
  <EspHome />
  <br>
  Log Messages:
  <br>
  <input type="checkbox" bind:checked={isVerbose}> Verbose
  <br>
  {#each log.objs.slice(-20).reverse() as l}
    <span>{formatter.format(l.date)}@{l.src}</span>
    <span>{l.msg}</span>
    {#if l.data && isVerbose} <pre> {l.data} </pre>{/if}
    <br>
  {/each}
</div>