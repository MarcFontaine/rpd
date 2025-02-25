<script lang="ts">
import {webRTC, webRTCCapture} from './state.svelte';
import {startSession, stopSession} from './capture';

let time = $state(0)
let paused = $state(false)

$effect( () =>
  { if (webRTC.api && !webRTCCapture.session) startSession()
// TODO: proper restart on reloading and proper cleanup
//    return () => { stopSession() } // does not work
  }
)

</script>

{#if webRTCCapture.enable}
<div>
<details>
<summary>
  <span>Outgoing WebRTC audio Stream: {paused ? "PAUSED" : ""}</span>
</summary>
<div style="display:flex; flex-direction: column;">

  {#if webRTCCapture.enableVideo}
  <video controls autoplay
    bind:this={webRTCCapture.mediaElement}
    bind:currentTime={time}
    bind:paused
  >
    <track kind="captions">
  </video>
  {:else}
  <audio controls autoplay
    bind:this={webRTCCapture.mediaElement}
    bind:currentTime={time}
    bind:paused
  >
    <track kind="captions">
  </audio>
  {/if}

  <span> SessionID: {webRTCCapture.clientId ? webRTCCapture.clientId : "undefined" } </span>
  <button onclick = {startSession}>
    Start
  </button>

  <button onclick = {stopSession}>
    Stop
  </button>

  <span>Consumers</span>
  <ul>
    {#each Object.entries(webRTCCapture.consumers) as [id, state]}
      <li>
      <span>{id}:{state}</span>
      </li>
    {/each}
  </ul>
</div>
</details>
</div>
{/if}