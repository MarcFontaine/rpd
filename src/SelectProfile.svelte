<script lang="ts">
import {replace} from 'svelte-spa-router'
import * as Config from './config';
import { currentProfile} from './state.svelte';
import * as Profile from './profile';
</script>

<div hidden={currentProfile.p !=null || null} >
<h1>Select Profile</h1>
<div>
<ul>
  {#each Config.profiles as p}
    <li key={p.name}>
      <button onclick={() => {
          replace('/rigcontrol');
          currentProfile.p=p;
	  Profile.initProfile(p)
	}}>
	{p.name}
      </button>
    </li>
 {/each}
</ul>
</div>
</div>
