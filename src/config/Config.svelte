<script lang="ts">
import { expertMode } from '../state.svelte';

import { setConfig, getConfig } from '../state.svelte';
import * as Config from './config';
import * as Profile from '../profile';

let {params} = $props();
let url = $state((params && params.wild) ? params.wild : null);
let username = $state("");
let password = $state("");

// https://remote-qth.oh0.duckdns.org/app/#/config/https://remote-qth.oh0.duckdns.org/config/f2.json
// http://localhost:5173/#/config/https://remote-qth.oh0.duckdns.org/config/f2.json

async function loadStartProfile() {
  loadProfile()
  .then(_res => startProfile());
};

async function startProfile() {
  if (profile) {
    Profile.initProfile();
  }
};

async function loadProfile() {
  const response = await fetch(url, {
    method:'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'Accept': 'application/x-yaml'
    }
  });
  const data = await response.text();
  if (data) {
    setConfig(Config.validateProfile(data));
    return (true)
  }
  else return false;
}

let fileInput: HTMLInputElement;
async function selectFile(e:Event) {
  const target = e.target as HTMLInputElement;
  if (!target || !target.files ) return;
  const file = target.files[0];
  readYamlFile(file)
    .then (text => {
      fileInput.value = "";
      setConfig(Config.validateProfile(text));
    })
}

function readYamlFile(file:File):Promise<Document> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
</script>

<div>
  <h2>
    RigControl Configuration
  </h2>
  <div>
  <form>
    Username:
    <br>  
    <input bind:value="{username}"
      id="username"
      type="text"
      name="username"
      autocomplete="username"
      required
    >
    <br>
    Password:
    <br>
    <input
      id="password"
      type="password"
      name="password"
      autocomplete="current-password"
      required
      bind:value="{password}"
    >
    <br>
    Configuration Server URL:
    <br>
    <input
      size="60"
      bind:value="{url}"
    >
    <br>
    </form>
    {#if !expertMode.value}
      <button
	onclick={loadStartProfile}
      >
      Start Profile
      </button>
      <br>
    {:else}
      <button
	onclick={loadProfile}
      >
      Load Profile from URL (with Username Password)
      </button>
    {/if}
  </div>
  {#if expertMode.value}
  <div>
   Load Profile from File
   <br>
   <input
     type=file
     bind:this={fileInput}
     onchange={selectFile}
     accept=".yaml"
   />
  </div>

  <button onclick={startProfile}>
      Start Profile
  </button>
  {/if}
  <br>
  <div>
  <button
    onclick={ Config.reset }
  >
    Reset Config
  </button>
  <br>
  <button
    onclick={ Config.saveToLocalStorage }
  >
     Save to Local Storage
  </button>
  <br>
  <button
    onclick={ Config.loadFromLocalStorage }
  >
    Load from Local Storage
  </button>
  </div>
</div>
