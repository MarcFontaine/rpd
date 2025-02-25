<script>
  import Typeahead from "svelte-typeahead";
  import {bookmarks} from "./bookmarks.ts";
  let v = $state("");
  
  function onSelect(event) {
    event.detail.original.runAction(event.detail.searched);
  }
</script>

<Typeahead
  label="Bookmarks"
  hideLabel
  placeholder={`Enter Frequency or Command`}
  data={bookmarks}
  extract={ item => item.getLabel(v) }
  on:select={onSelect}
  on:clear={() => {} }
  disable={ item => item.isDisabled }
  bind:value={v}
>
<svelte:fragment slot="no-results">
    No results found for 
  </svelte:fragment>
</Typeahead>

<style>
  :global(input) {
    margin: 0;
  }
</style>