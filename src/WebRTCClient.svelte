<script lang="ts">
import {webRTC, webRTCClient} from './state.svelte';
import {startSession} from './webrtc';
</script>

{#if webRTCClient.enable}
<div>
<h2>
  Remote WebRTC Streams
</h2>
<div style="display:flex; flex-direction: column;">
  {#each Object.entries(webRTCClient.producers) as [id, p]}
  <p>
    Client ID: {id}
    <br>
    Callsign : {p.producer.meta.call}
    <br>
    {#if webRTCClient.enableVideo}
    <video controls
      bind:this={webRTCClient.producers[id].mediaElement}
    >
      <track kind="captions">
    </video>
    {:else}
    <audio controls
      bind:this={webRTCClient.producers[id].mediaElement}
    >
    </audio>
    {/if}
    <br>
    <button
      onclick={() => {
        const session = webRTC.api.createConsumerSession(id);
	startSession(p, webRTCClient.producers[id].mediaElement, session)
      }}
    >
    Start {p.producer.meta.name}  
    </button>
    <button
      onclick={() => {
        p.session.close();
      }}
    >
    Stop {p.producer.meta.name}  
    </button>
  </p>
  {/each}
</div>
</div>
{/if}