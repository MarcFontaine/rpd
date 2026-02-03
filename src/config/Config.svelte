<script lang="ts">
import * as Config from './config';
import * as Profile from '../profile';
import { currentProfile, settings } from '../state.svelte';

let {params} = $props();
let profile = $state(currentProfile.p ? currentProfile.p : null);
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
    currentProfile.p = profile;
    Profile.initProfile(profile);
  }
};

async function loadProfile() {
  const response = await fetch(url, {
    method:'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'Accept': 'application/json'
    }
  });
  const data = await response.json();
  if (data) {
    profile = Config.validateProfile(data);
    return (true)
  }
  else return false;
}

async function selectFile(e:Event) {
  const target = e.target as HTMLInputElement;
  if (!target || !target.files ) return;
  const file = target.files[0];
  readJsonFile(file)
    .then (json => {
      profile = Config.validateProfile(json);
    })
}

function readJsonFile(file:File):Promise<JSON> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(JSON.parse(reader.result as string));
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
</script>

<div>
  <h2>
    Remote QTH Configuration
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
    {#if !settings.expertMode}
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
  {#if settings.expertMode}
  <div>
   Load Profile from File
   <br>
   <input type=file onchange={selectFile} accept=".json"/>
  </div>

  {#if profile}
  <div>
    <h2>
    Current Profile : {profile.name}
    </h2>
  <br>
  <textarea rows="30" cols="80" disabled>
  {JSON.stringify(profile, null, 4)}
  </textarea>
  </div>
  {/if}
    {#if profile}
      <button onclick={startProfile}>
      Start Profile
      </button>
    {/if}
  {/if}
</div>
