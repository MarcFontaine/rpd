<script module lang="ts">
import Typeahead from "svelte-typeahead";
import {nopBookmark, bookmarks} from '../bookmarks/bookmarks';
import { config } from '../state.svelte';

export { buttonConfig };

function pathForButton(i) {
  return ['rigpage','current_config', 'hid' , 'buttons', String(i) ];
};

function initButtons() {
  var buttons = new Array(16).fill(nopBookmark);
  buttons.forEach((b, i) => {
    const path = pathForButton(i);
    const existingNode = config.getIn(path);
    if (existingNode !== undefined && existingNode !== null) {
      const value = (typeof n === 'object' && 'value' in n) ? n.value : n;
      if (typeof value === 'string') {
	const match = bookmarks.find(opt => String(opt.value) === String(value))
	if (match) {
          b = match;
        } else {
          console.warn(`Warning: Button ${i} command "${value}" does not exist`);
          b = nopBookmark
        }
      }
    }
    else {
      config.setIn(path,nopBookmark.label );
    }
  });
  return buttons;
}

var buttonConfig = $state(initButtons());
</script>
