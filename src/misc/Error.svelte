<script lang="ts">
import {rig, log} from '../state.svelte';

function ackError(e:any) {
  e.isErrorConfirmed = true;
  log.errors = log.errors.filter((elem) => elem !== e);
};

</script>

{#if log.errors.length >0 }
<div>
  Error
   <button
     onclick={() => log.errors=[] }
   >
   Ack All
   </button>

<div>
  {#each log.errors.slice(-20).reverse() as l}
    {#if !l.isErrorConfirmed}
      <span>
        <button
	  onclick={() => ackError(l) }
	>
	Ack
	</button>
        {l.src} {l.msg}
      </span>
      <br>
    {/if}
  {/each}
</div>
</div>
{/if}