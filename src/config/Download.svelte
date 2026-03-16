<script module lang="ts">
import ProfileManager from './ProfileManager.svelte';
import { ConfigVar } from '../config/ConfigVar.svelte';
export const configURL = new ConfigVar(
    { default: ''
    , path: [ 'config', 'downloadURL' ]
    });
</script>

<script lang="ts">
import { replace } from 'svelte-spa-router'
import * as Config from './config.svelte';
import * as Profile from '../profile';

let {params} = $props();
let url = $state((params && params.wild && params.wild !='') ? params.wild : configURL.value);
let username = $state('');
let password = $state('');
let config_txt = $state('');
let preselect = $state(null);

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
    view = 'config';
    config_txt = data;
    createProfile(data);
    return (true);
  }
  else return false;
}

function createProfile(txt) {
  const profile = Config.validateProfile(txt);
  const name =
      (profile.toJSON().config.name ?? 'Downloaded_Config')
    + '_'
    + crypto.randomUUID().slice(0,8);
  const newPair = Config.getConfig().createPair(name, profile.getIn([]));
  Config.getProfiles().items.push(newPair);
  Config.updateYaml.trigger++;
  preselect = newPair;
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
<div>
  <ProfileManager preselect={preselect} />
  <details>
    <summary>
      Downloaded Configuration
    </summary>
      <pre>
{config_txt}
      </pre>
  </details>
</div>
{/if}
</div>
