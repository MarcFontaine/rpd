<script lang="ts">
import { replace } from 'svelte-spa-router'
import * as Config from './config';
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
  <h2>
    Start Profile `{pair.key}`
  </h2>
  </button>
{/snippet}

<div>
  <h2>
    Profiles
  </h2>
  <table>
  {#each Config.getProfiles().items as pair}
    {@render StartProfile(pair)}
  {/each}
  </table>
</div>
<div>
  <button>
  <h2>
      Profile Manager
  </h2>
  </button>
</div>
