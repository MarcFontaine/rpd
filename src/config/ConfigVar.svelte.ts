import { Document } from 'yaml';
export interface ConfigOptions<T> {
  default: T;
  path: string[];
}

export class ConfigVar<T> {
  static allInstances: ConfigVar<any>[] = [];
  #default : T;
  #value = $state() as T;
  #isDirty = $state(false);
  #path : string[];

  constructor(o: ConfigOptions<T>) {
    this.#default = o.default;
    this.#value = o.default;
    this.#path = o.path
    ConfigVar.allInstances.push(this);
  }

  get value(): T {
    return this.#value;
  }

  get isDirty(): boolean {
    return this.#isDirty;
  }

  set value(newValue: T) {
    this.#value = newValue;
    this.#isDirty = true;
  }

  reset() {
    this.#value = this.#default;
  }

  toYaml(config: Document) {
      config.setIn(this.#path, this.#value);
  }

  fromYaml(config: Document) {
    const n = config.getIn(this.#path);
    if (n !== undefined && n !== null) {
      const v = (typeof n === 'object' && 'value' in n) ? n.value : n;
      if (typeof v === typeof this.#value) {
        this.#value = v as T;
      }
    }
  }
}

export function allToYaml(config: Document) {
  ConfigVar.allInstances.forEach(v => v.toYaml(config));
}

export function allFromYaml(config: Document) {
  ConfigVar.allInstances.forEach(v => v.fromYaml(config));
}

export function allReset() {
  ConfigVar.allInstances.forEach(v => v.reset());
}

export function uiOption<T>(def:T, path: string):ConfigVar<T>
{
  return new ConfigVar(
    { default: def
    , path: [ 'rigpage', 'current_config', 'ui', path ]
    });
}