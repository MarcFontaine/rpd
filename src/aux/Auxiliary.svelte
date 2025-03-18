<script lang="ts">
import { currentProfile } from '../state.svelte';
</script>

<div>
 {#if currentProfile.p.tasmotaURL}
 <iframe src="{currentProfile.p.tasmotaURL}"
 height="900"
 width="400"
 title="Tasmota"
 loading="auto"
 >
 </iframe>
 {/if}
</div>
