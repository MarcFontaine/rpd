<script lang="ts">
  import Typeahead from "svelte-typeahead";
  import {settings} from '../state.svelte';
  import {bookmarks} from "./bookmarks";
  let v = $state("");
</script>

{#if settings.showSearchBar}
<Typeahead
  label="Bookmarks"
  hideLabel
  placeholder={`Enter Frequency or Command`}
  data={bookmarks}
  extract={ item => item.getLabel(v) }
  on:select={ event => event.detail.original.runAction(event.detail.searched) }
  on:clear={() => {} }
  disable={ item => item.isDisabled }
  bind:value={v}
>

<svelte:fragment slot="no-results">
    No results found for {v}
</svelte:fragment>

</Typeahead>
{/if}

<style>
:global([data-svelte-search] input) {
    width: 100%;
    padding: 0.5rem 0.75rem;
    background: none;
    font-size: 0.5em;
    border: 0;
    border-radius: 0;
    border: 1px solid #e5e5e5;
  }
</style>