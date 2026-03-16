<script lang="ts">
import { replace } from 'svelte-spa-router'
import * as Config from './config.svelte';
import { YAMLMap, Pair } from 'yaml';

let { preselect } = $props();

const config = Config.getConfig();
const profiles = Config.getProfiles().items;

let selected = $state(preselect as null | YAMLMap);

let msg = $state('ok');

function newProfile() {
  const p = config.createNode();
  const newPair = config.createPair(
     `New_Profile_${crypto.randomUUID().slice(0,8)}`,
     p);
   profiles.push(newPair);
   Config.updateYaml.trigger++;
   selected = newPair;
}

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
  <button
    onclick={newProfile}
  >
    Create New Profile
  </button>
  <br>
  <button
    onclick={ ()=> {
        Config.saveToLocalStorage();
        replace('/')
      }
    }
  >
    Save and Exit
  </button>
  <br>
  Current Profiles:
  <br>
  {#each Config.updateYaml.trigger ? profiles :null as p}
    {@render SelectProfile(p)}
    <br>
  {/each}
  <br>
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
    onclick={ () => {
      const newPair = config.createPair(
        `Clone_of_${selected.key}_${crypto.randomUUID().slice(0,8)}`,
	selected.value.clone());
      profiles.push(newPair);
      Config.updateYaml.trigger++;
      selected = newPair;
      }
    }
  >
    Clone
  </button>
  <br>
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