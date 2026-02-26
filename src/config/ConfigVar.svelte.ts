import { config } from '../state.svelte';

export interface ConfigOptions<T> {
  default: T;
  path: string[];
}

export class ConfigVar<T> {
  #value = $state() as T;
  #isDirty = $state(false);
  #path = [] as string[];

  constructor(o: ConfigOptions<T>) {
    this.#value = o.default;
    this.#path = o.path
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
    this.toYaml(); // testing
  }

  toYaml() {
      config.setIn(this.#path, this.#value);
  }

  fromYaml() {
    const n = config.getIn(this.#path);
    if (n !== undefined && n !== null) {
      const v = (typeof n === 'object' && 'value' in n) ? n.value : n;
      if (typeof v === typeof this.#value) {
        this.value = v as T;
      }
    }
  }
}
