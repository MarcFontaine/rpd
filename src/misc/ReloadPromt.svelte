<script lang="ts">
  import { pwa } from './pwa.svelte.ts';
  import About from '../debug/About.svelte';
</script>

{#if pwa.needRefresh || pwa.isOfflineReady }
  <div class="pwa-notification">
    <div>
      <About />
      {#if pwa.isOfflineReady}
      <span>
        App ready to work offline
      </span>
      {/if}
    </div>
    {#if pwa.needRefresh }
      <span>
        New content available.
      </span>
      <button onclick={() => pwa.update()}>
        Load Update and Reload App
      </button>
    <button onclick={() => pwa.ignoreUpdate()}>
      Ignore Update and Continue
    </button>
    {/if}
  </div>
{/if}

<style>
  .pwa-notification {
    position: fixed;
    top: 0px;
    left: 0px;
    background: #333;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 9999;
  }
</style>
