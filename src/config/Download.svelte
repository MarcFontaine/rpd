<script module lang="ts">
import ProfileManager from './ProfileManager.svelte';
import { ConfigVar } from '../config/ConfigVar.svelte';
export const configURL = new ConfigVar(
    { default: ''
    , path: [ 'config', 'downloadURL' ]
    });
</script>

<script lang="ts">
import { gotoRoot } from '../ui/routes';
import * as Config from './config.svelte';
import * as Profile from '../profile';

let {params} = $props();
let url = $state((params && params.wild && params.wild !='') ? params.wild : configURL.value);
let username = $state('');
let password = $state('');
let config_txt = $state('');
let preselect = $state(null);
let view = $state('download');
let error =  $state('');

async function safeFetch() {
  try {
    const response = await fetch(url, {
      method:'GET',
      cache: 'no-store',
      credentials: 'omit',
      headers: {
	'Authorization': 'Basic ' + btoa(`${username}:${password}`),
	'Accept': 'application/x-yaml'      
      }    
    });
    if (!response.ok) {
      return { 
        data: null, 
        error: `Download Error: ${response.status}`
      };
    }
    const text = await response.text();
      return { data: text, error: null, status: response.status };

  } catch (err) {
    return { 
      data: null, 
      error: err instanceof Error ? err.message : "Download Error"
    };
  }
}

async function loadConfig() {
  error = '';
  const fetchResult = await safeFetch();
  if (fetchResult.error) {
    error = fetchResult.error;
    return;
  }
  const profile = Config.validateProfile(fetchResult.data);
  if (profile) {
    view = 'config';
    config_txt = fetchResult.data;
    Config.getProfiles().items.push(profile);
    Config.updateYaml.trigger++;
    preselect = profile;
    return (true);
  }
  else {
    error = "Error: Cannot validate Profile";
    return false;
  }
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
      onclick={ () => gotoRoot() }
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
<div>
{#if error }
Error:
<br>
<pre>
{error}
</pre>
{/if}
</div>
</div>
