<script lang="ts">
import Power from './Power.svelte';
import Settings from './Settings.svelte';
import AudioIn from './AudioIn.svelte';
import AudioOut from './AudioOut.svelte';
import CatConnection from './CatConnection.svelte';
import Links from './Links.svelte';
import Transmitting from './Transmitting.svelte';
</script>

<div class="status-bar" style:height="5em" >
<Power />
<Settings />
<AudioIn />
<AudioOut />
<CatConnection />
<Links />
<Transmitting />
</div>
<style>
.status-bar {
display: flex;
flex-direction: row;
background: lightgrey;
}
</style>