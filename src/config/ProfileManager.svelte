<script lang="ts">
import * as Config from './config.svelte';
import { YAMLMap, Pair } from 'yaml';

const profiles = Config.getProfiles().items;
let selected = $state(null | YAMLMap);
let msg = $state('ok');

</script>

{#snippet SelectProfile(p)}
  <button
    onclick={()=> { selected = p;} }
  >
    '{Config.updateYaml.trigger ? p.key: ''}'
  </button>
{/snippet}

<div>
  <h2>
    Edit Profile
  </h2>
  {#each Config.updateYaml.trigger ? profiles :null as p}
    {@render SelectProfile(p)}
    <br>
  {/each}
</div>


{#if selected}
<div>
  Profile Name:
  <input
    type="text"
    size="40"
    value="{selected.key}"
    placeholder="Profile Name"
    oninput = {
      e => {
      if (e.target.value == '') {
        msg = 'Empty Profile Name'
      }
      else if (
        profiles.find(
	  (s, i, _) => s.key == e.target.value && i != profiles.indexOf(selected)
	))
      {
        msg = 'Duplicate Profile Name';
      } else
      {
        msg = 'Name updated';
	Config.updateYaml.trigger++;
        selected.key = e.target.value;
      }
      }
      }
  >
<br>
  <button
    onclick={()=> {
      Config.setProfile(selected.value);
      Config.startProfile();
      }
      }
  >
    Start
  </button>
  <button
    onclick={ () => {
      const newPair = new Pair(
        `Clone_of_${selected.key}_${crypto.randomUUID().slice(0,8)}`,
	selected.value);
      profiles.push(newPair);
      Config.updateYaml.trigger++;
      selected = newPair;
      }
    }
  >
    Clone
  </button>

  <input
    type="checkbox"
    onchange={e => {
      }
    }
  />
  {#if profiles.length > 1}
    <button
	onclick={
	  () => {
	    profiles.splice(profiles.indexOf(selected), 1);
            Config.updateYaml.trigger++;
	    selected = null;
	  }
	}
	
    >
      Delete
    </button>
  {/if}
  <br>
  {msg}
  </div>
{/if}