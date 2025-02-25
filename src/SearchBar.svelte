<script lang="ts">
  import Typeahead from "svelte-typeahead";
  import {bookmarks} from "./bookmarks";
  let v = $state("");
  
</script>

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
    No results found for 
  </svelte:fragment>
</Typeahead>

<style>
  :global(input) {
    margin: 0;
  }
</style>