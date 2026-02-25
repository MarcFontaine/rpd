<script module lang="ts">
import Typeahead from "svelte-typeahead";
import {bookmarks} from '../bookmarks/bookmarks';
import { buttonConfig } from './ButtonConfig.svelte';
export { ButtonSettings };
</script>

{#snippet ButtonSettings(state)}
<div class="button-settings">
<table>
  <thead>
    <tr>
      <th>Button</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#each buttonConfig as _, i}
	{@render Button(
	    i,
	    (state.current !==null && state.current.buttons & (1 << i)) ? 'green' : 'black'
	)}
    {/each}
  </tbody>
</table>
</div>
{/snippet}

{#snippet Button(i, color)}
  <tr>
    <td style:width=10%;>
      <span style:color={color} >
       {i}
      </span>
    </td>
  <td>
    <Typeahead
      value={ buttonConfig[i].label }
      label="Button Shortcuts"
      hideLabel
      placeholder={'Action for Button'}
      data={bookmarks}
      extract={ item => item.label }
      showDropdownOnFocus={true}
      on:select={ event => {buttonConfig[i]=event.detail.original}}
    >
    <svelte:fragment slot="no-results">
	Command not found
    </svelte:fragment>
   </Typeahead>
  </td>
</tr>
{/snippet}

<style>
.button-settings :global([data-svelte-search] input) {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1em;
    border: 0;
    border-radius: 0;
    border: 1px solid;
  }
</style>
