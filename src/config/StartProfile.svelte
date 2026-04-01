<script lang="ts">
import { replace } from 'svelte-spa-router'
import * as Config from './config.svelte';
import * as Profile from '../profile';
import * as WebSerial from '../serial';

</script>

{#snippet StartProfile(p)}
  <button
    onclick={()=> {
      Config.setProfile(p);
      Config.startProfile();
    }}
  >
    {Config.getConfigName(p)}
  </button>
  <br>
{/snippet}

<div>
  <div class="profile-list">
  Start Profile
  <br>
  {#each (Config.updateYaml.trigger ? Config.getProfiles().items : null) as p}
      {@render StartProfile(p)}
    {/each}
  </div>
</div>
<div>
  <button
    onclick={ () => replace('/profiles') }
  >
     Go to Profile Manager
  </button>
</div>

<style>
  .profile-list {
    border: 2px solid #333;
    padding: 0.5em;
    border-radius: 8px;

  }
  button {
    border: 2px solid #333;
    padding: 0.5em;
    border-radius: 8px;
    font-size: 1em;
  }
</style>