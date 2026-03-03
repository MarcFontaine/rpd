<script module lang="ts">
import { ConfigVar } from '../config/ConfigVar.svelte';

const baseURL = new ConfigVar(
    { default: ''
    , path: [ 'rigpage', 'current_config', 'ft8', 'DBServer' ]
    });

const query = new ConfigVar(
    { default: 'wsjtx_extended?limit=10&order=time.desc'
    , path: [ 'rigpage', 'current_config', 'ft8', 'query' ]
    });
</script>

<script lang="ts">
import { onMount } from 'svelte';
import FT8Clock from './FT8Clock.svelte';

let decoded = $state([]);
let fullQuery = $derived(baseURL.value + '/' + query.value);

async function getFT8Decoded() {
  const response = await fetch(fullQuery, {
    method:'GET',
    headers: {
      'Accept': 'application/json'
    }
  });
  const data = await response.json();
  if (data) {
//    console.log(data);
    decoded = data;
    return (true)
  }
  else return false;
}

onMount(() => {
  const interval = setInterval(() => {
    getFT8Decoded();
  }, 4000);

  return () => {
    clearInterval(interval);
  };
});

</script>

{#snippet decodedRow(d)}
  <th>{d.decode.decode_client_id}</th>
  <th>{d.time.slice(11, 19)}</th>
  <th>{d.decode.decode_message}</th>
  <th>{d.decode.decode_snr}</th>
  <th>{d.decode.decode_delta_time}</th>
{/snippet}

<div>
FT8
<div style="width: 4em;" >
<FT8Clock />
</div>
<input size="60" bind:value={baseURL.value}> Postgrest base URL
<br>
<input size="60" bind:value={query.value}> Query String
<br>
<span> Full Query: {fullQuery}</span>
<br>
<button
onclick={()=> decoded = []}
>
Clear
</button>

<table>
  <thead>
     <tr>
        <th>Receiver</th>
        <th>Time</th>
        <th>Message</th>
        <th>SNR</th>
	<th>dt</th>
     </tr>
  </thead>
    <tbody>
    <tbody>
    {#each Object.values(decoded) as row}
      <tr>
	{@render decodedRow(row)}
      </tr>
    {/each}
    </tbody>
</table>
</div>
