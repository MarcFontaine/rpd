<script lang="ts">
import { replace } from 'svelte-spa-router'
import * as Config from './config.svelte';
import * as Profile from '../profile';
import * as WebSerial from '../serial';

</script>

{#snippet StartProfile(pair)}
  <button
    onclick={()=> {
      Config.setProfile(pair.value);
      Config.startProfile();
    }}
  >
    Start `{pair.key }`
  </button>
  <br>
{/snippet}

<div>
  <h2>
    Start Profile
  </h2>

<table>
  {#each (Config.updateYaml.trigger ? Config.getProfiles().items : null) as pair}
    {@render StartProfile(pair)}
  {/each}
  </table>
</div>
<div>
  <button
    onclick={ () => replace('/profiles') }
  >
     Go to Profile Manager
  </button>
</div>
