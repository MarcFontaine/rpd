<script module lang="ts">
import { ConfigVar } from '../config/ConfigVar.svelte';
import {Bookmark, nopBookmark, bookmarks} from '../bookmarks/bookmarks';

export { buttonConfig };

class ButtonConfig extends ConfigVar<string> {
  #command: Bookmark
  constructor(i:number, command: Bookmark){
    super(
      { default: command.label
      , path: pathForButton(i)
      })
    this.#command = command
  }
  get command(): Bookmark {
    return this.#command;
  }
}

const buttonConfig : ButtonConfig[] = [];

function pathForButton(i:Number) {
  return ['rigpage','current_config', 'hid' , 'buttons', String(i) ];
};

for (let i = 0; i <=15; i++) {
  buttonConfig.push( new ButtonConfig(i, nopBookmark) )
}

</script>
