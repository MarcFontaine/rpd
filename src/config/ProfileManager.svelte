<script lang="ts">
import { fly, slide } from 'svelte/transition';
import { quintOut } from 'svelte/easing';
import { YAMLMap, Pair } from 'yaml';

import * as Config from './config.svelte';
import { gotoRoot } from '../ui/routes';

let { preselect } = $props();

let config = Config.getConfig();
let undoConfig = config.clone();
let profiles = $state(Config.getProfiles().items);

let selected = $state(preselect as null | YAMLMap);

let msg = $state('ok');

function newProfile() {
  const p = config.createNode({});
  Config.setConfigName(p, 'New_Profile');
  profiles.push(p);
  Config.updateYaml.trigger++;
  selected = p;
}

</script>
{#snippet SelectProfile(p)}
<div
  class="select-profile"
>
  <button
    onclick={()=> { selected = p;} }
  >
    '{Config.updateYaml.trigger ? Config.getConfigName(p) : 'Unnamed Profile'}'
  </button>
</div>
{/snippet}

{#snippet EditProfile(p)}
<div
  class="edit-profile"
  in:slide={{ duration: 1000, delay: 0, easing: quintOut }}
  out:slide={{ duration:1000, delay: 0, easing: quintOut }}
>
  Profile Name: {Config.updateYaml.trigger && Config.getConfigName(p)}
  <br>
  <input
    style:font-size="1em"
    type="text"
    size="40"
    value="{Config.getConfigName(selected)}"
    placeholder="Profile Name"
    oninput = {
      e => {
      if (e.target.value == '') {
        msg = 'Empty Profile Name'
      }
      else
        {
          msg = 'Name updated';
          Config.setConfigName(selected, e.target.value);
          Config.updateYaml.trigger++;
        }
      }
      }
  >
  <br>
  <div class="button-row">
  <button
    onclick={ () => {
      selected = null;
    }}
  >
    OK
  </button>
  <button
    onclick={ () => {
      const p = selected.clone();
      const i = profiles.indexOf(selected);
      profiles = [
        ...profiles.slice(0, i),
	selected,
	p,
        ...profiles.slice(i + 1)
      ];
      Config.updateYaml.trigger++;
      }
    }
  >
    Clone
  </button>
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
  </div>
  </div>
{/snippet}

<div>
  Profile Editor
  <br>
  <div class="profile-list">
  Current Profiles:
  <br>
  {#each Config.updateYaml.trigger ? profiles :null as p (p)}
    <div class="list-item">
     {@render SelectProfile(p)}
     {#if selected && selected == p}
       {@render EditProfile(p)}
     {/if}
     </div>
  {/each}
  </div>
</div>
  <button
    onclick={newProfile}
  >
    Create New Profile
  </button>
  <br>
  <button
    onclick={ () => {
      Config.setConfig(undoConfig);
      config = undoConfig;
      profiles = Config.getProfiles().items;
      Config.updateYaml.trigger++;
    }}
  >
    Undo
  </button>
  <br>
  <button
    onclick={ () => {
      const p = Config.emptyConfig.clone()
      Config.setConfig(p);
      config = p;
      profiles = Config.getProfiles().items;
      Config.updateYaml.trigger++;
    }}
  >
    Reset Editor to Default Profiles
  </button>
  <br>
  <button
    onclick={ ()=> {
        Config.saveToLocalStorage();
        gotoRoot();
      }
    }
  >
    Save Profiles and Exit
  </button>
  <br>
  <button
    onclick={ ()=> {
        gotoRoot();
      }
    }
  >
    Exit
  </button>
  <br>
  {msg}
<br>


<style>
  .profile-list {
    border: 2px solid #333;
    padding: 0.5em;
    border-radius: 8px;

  }
  .edit-profile {
    grid-area: stack;
    z-index: 2;
    border: 2px solid #333;
    padding: 0.5em;
    border-radius: 8px;
    background: white;
  }
  .select-profile {
    grid-area: stack;
    font-size: 1em;
  }
  button {
    border: 2px solid #333;
    padding: 0.5em;
    border-radius: 8px;
    font-size: 1em;
  }
  .button-row {
    display: flex;
    align-items: center;
    gap: 1em;
    border: 1px solid #ccc;
    padding: 0.5em;
  }
</style>