<script module lang="ts">
import Option from '../settings/Options.svelte';
import * as S from './webrtc';

export {WebRtcSettings};
</script>

{#snippet WebRtcSettings()}
<div>
  <Option bind:o={S.enableSink.value} d={'Enable receiving WebRTC streams'} />
  <Option bind:o={S.enableSource.value} d={'Enable sending WebRTC streams'} />  

  {#if S.enableSink.value || S.enableSource.value}
    <br>
    <input type="text" size="80" bind:value={S.metaName.value}> Meta Name
    <br>
    <input type="text" size="80" bind:value={S.metaProducerName.value}> Name of audio Producer
    <br>
    <input type="number" size="80" bind:value={S.reconnectionTimeout.value}> Reconnection Timeout    
    <br>
    <input type="text" size="80" bind:value={S.signalingServer.value}> WebRTC WSS/Signalling Server
    <br>
    <input type="text" size="80" bind:value={S.IceServerUrls.value}> WebRTC ICE Server
    <br>
    <input type="text" size="80" bind:value={S.IceServerUsername.value}> Username for ICE Server
    <br>
    <input type="text" size="80" bind:value={S.IceServerCredential.value}> Password for ICE Server
  {/if}
</div>
{/snippet}