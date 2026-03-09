<script module lang="ts">
import { ConfigVar } from '../config/ConfigVar.svelte';
export const configURL = new ConfigVar(
    { default: ''
    , path: [ 'config', 'downloadURL' ]
    });
</script>

<script lang="ts">
import { replace } from 'svelte-spa-router'
import * as Config from './config';
import * as Profile from '../profile';

let {params} = $props();
let url = $state((params && params.wild && params.wild !='') ? params.wild : configURL.value);
let username = $state('');
let password = $state('');
let config = $state('');

let view = $state('download');

async function loadConfig() {
  const response = await fetch(url, {
    method:'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'Accept': 'application/x-yaml'
    }
  });
  const data = await response.text();
  if (data) {
    config = data;
    view = 'config'
    return (true)
  }
  else return false;
}

</script>

<div>
{#if view == 'download' }
  <h2>
    Download Configuration from Server
  </h2>
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
      bind:value="{username}"
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
    <button
      onclick={() => loadConfig()}
    >
    Load Config from Configuration Server (with Username Password)
    </button>
    <br>
    <button
      onclick={ () => replace('/') }
    >
    Continue Without Downloading
    </button>
  </div>
{/if}
{#if view == 'config' }
  <h2>
    New Configuration
  </h2>
    <button
      onclick = { () => {
        Config.setConfig(Config.validateProfile(config));
        Config.saveToLocalStorage;
        replace('/settings');
      }}
    >
    Import
    </button>
    <br>
    <button
      onclick = { () => {
        Config.setConfig(Config.validateProfile(config));
        Config.saveToLocalStorage;
        Profile.initProfile();
        replace('/rigcontrol');
      }}
    >
    Import and Start
    </button>
    <br>
    <button
      onclick={ () => replace('/') }
    >
    Discard
    </button>
    <details>
    <summary>
      View Configuration
    </summary>
      <pre>
{config}
      </pre>
    </details>
{/if}  
</div>
