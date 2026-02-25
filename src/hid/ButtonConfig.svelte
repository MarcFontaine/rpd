<script module lang="ts">
import {nopBookmark, bookmarks} from '../bookmarks/bookmarks';
import { config } from '../state.svelte';

export { buttonConfig };

function pathForButton(i:Number) {
  return ['rigpage','current_config', 'hid' , 'buttons', String(i) ];
};

function initButtons() {
  var buttons = new Array(16).fill(nopBookmark);
  buttons.forEach((_b, i) => {
    const path = pathForButton(i);
    const n = config.getIn(path);
    if (n !== undefined && n !== null) {
      const value = (typeof n === 'object' && 'value' in n) ? n.value : n;
      if (typeof value === 'string') {
	const match = bookmarks.find(opt => String(opt.value) === String(value))
	if (match) {
          buttons[i] = match;
        } else {
          console.warn(`Warning: Button ${i} command "${value}" does not exist`);
          buttons[i] = nopBookmark
        }
      }
    }
    else {
      config.setIn(path,nopBookmark.label );
      buttons[i] = nopBookmark;
    }
  });
  return buttons;
}

var buttonConfig = $state(initButtons());
</script>
