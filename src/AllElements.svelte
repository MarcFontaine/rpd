<script>
import Config from './Config.svelte';
import RigControl from './RigControl.svelte';
import LocalSerial from './LocalSerial.svelte';
import Settings from './settings/Settings.svelte';
import Debug from './misc/Debug.svelte';
import WebRTCToggle from './WebRTCToggle.svelte';
import Wheel from './misc/Wheel.svelte';
import Test from './misc/Test.svelte';
import Frequency from './cat/Frequency.svelte';
import Auxiliary from './aux/Auxiliary.svelte';
import HID from './misc/HID.svelte';

let p = $props();
</script>
{#if p.element == 'Config'}
  <Config />
{:else if p.element == 'RigControl'}
  <RigControl />
{:else if p.element == 'Debug'}
  <Debug />
{:else if p.element == 'Settings'}
  <Settings />
<!--
{:else if p.element == 'Empty'}
-->
{/if}