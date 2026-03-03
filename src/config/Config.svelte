<script module lang="ts">
export { DownloadConfig };

import { expertMode } from '../state.svelte';

import { setConfig, getConfig } from '../state.svelte';
import * as Config from './config';
import * as Profile from '../profile';

async function loadStartProfile(args) {
  loadProfile(args)
  .then(_res => startProfile());
};

async function startProfile() {
  Profile.initProfile();
};

async function loadProfile(args) {
  const response = await fetch(args.url, {
    method:'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${args.username}:${args.password}`),
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
  <button
    onclick={ Config.loadFromLocalStorage }
  >
    Load from Local Storage
  </button>
  </div>
</div>

{#snippet DownloadConfig(args)}
  <div>
  <form>
    Username:
    <br>  
    <input
      id="username"
      type="text"
      name="username"
      autocomplete="username"
      required
      bind:value="{args.username}"
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
      bind:value="{args.password}"
    >
    <br>
    Configuration Server URL:
    <br>
    <input
      size="60"
      bind:value="{args.url}"
    >
    <br>
    </form>
    {#if !expertMode.value}
      <button
	onclick={()=>loadStartProfile(args)}
      >
      Start Profile
      </button>
      <br>
    {:else}
      <button
	onclick={()=>loadProfile(args)}
      >
      Load Config from Configuration Server (with Username Password)
      </button>
    {/if}
  </div>
{/snippet}
