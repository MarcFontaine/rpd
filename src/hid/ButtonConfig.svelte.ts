import { YAMLMap } from 'yaml';
import { AConfig, allInstances } from '../config/ConfigVar.svelte';
import {Bookmark, nopBookmark, bookmarks} from '../bookmarks/bookmarks';

export { buttonConfig };

class ButtonConfig extends AConfig<string> {
  #command: Bookmark
  #default : Bookmark;
  #value = $state(nopBookmark.label);
  #isDirty = $state(false);
  #path : string[];

  constructor(i:number, command: Bookmark){
    super();
    this.#default = command;
    this.#command = command;    
    this.#value = command.label;
    this.#path = pathForButton(i);
    allInstances.push(this);
  }

  get command(): Bookmark {
    return this.#command;
  }

  set command(cmd: Bookmark) {
    this.#command = cmd;
    this.#value = cmd.label;
  }

  set value( txt:string ) {
    const cmd = bookmarks.find(i => i.label == txt);
    if (cmd) {
      this.#value = txt;
      this.#command = cmd;
    }
    else
    {
      console.log('Bookmark ',txt,' not found: Reset to NOP');
      this.#command = nopBookmark;
      this.#value = nopBookmark.label;
    }
  }

  get value() {
    return this.#value;
  }

  get isDirty(): boolean {
    return this.#isDirty;
  }

  reset() {
    this.#command = this.#default;
    this.#value = this.#default.label;
  }

  toYaml(config: YAMLMap) {
      config.setIn(this.#path, this.#value);
  }

  fromYaml(config: YAMLMap) {
    const n = config.getIn(this.#path);
    if (n !== undefined && n !== null) {
      const v = (typeof n === 'object' && 'value' in n) ? n.value : n;
      if (typeof v === typeof this.#value) {
        this.value = v as string;
      }
    }
  }
}

const buttonConfig : ButtonConfig[] = [];

function pathForButton(i:Number) {
  return [ 'hid' , 'buttons', String(i) ];
};

for (let i = 0; i <=15; i++) {
  buttonConfig.push( new ButtonConfig(i, nopBookmark) )
}
