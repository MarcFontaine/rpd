import { YAMLMap } from 'yaml';
export interface ConfigOptions<T> {
  default: T;
  path: string[];
}

export const allInstances : AConfig<any>[] = [];

export abstract class AConfig<_T> {
  abstract get isDirty(): boolean;
  abstract reset(): void;
  
  abstract toYaml(config: YAMLMap): void;
  abstract fromYaml(config: YAMLMap): void;
};

export class ConfigVar<T> extends AConfig<T> {
  #default : T;
  #value = $state() as T;
  #isDirty = $state(false);
  #path : string[];

  constructor(o: ConfigOptions<T>) {
    super();
    this.#default = o.default;
    this.#value = o.default;
    this.#path = o.path
    allInstances.push(this);
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

  toYaml(config: YAMLMap) {
      config.setIn(this.#path, this.#value);
  }

  fromYaml(config: YAMLMap) {
    const n = config.getIn(this.#path);
    if (n !== undefined && n !== null) {
      const v = (typeof n === 'object' && 'value' in n) ? n.value : n;
      if (typeof v === typeof this.#value) {
        this.#value = v as T;
      }
    }
  }
}

export function allToYaml(config: YAMLMap) {
  allInstances.forEach(v => v.toYaml(config));
}

export function allFromYaml(config: YAMLMap) {
  allInstances.forEach(v => v.fromYaml(config));
}

export function allReset() {
  allInstances.forEach(v => v.reset());
}

export function uiOption<T>(def:T, path: string):ConfigVar<T>
{
  return new ConfigVar(
    { default: def
    , path: [ 'ui', path ]
    });
}

export class PasswordConfig extends AConfig<string> {
  #passwordPlain = $state() as string;
  #path : string[];
  #isDirty : boolean;

  constructor(o: ConfigOptions<string>) {
    super();
    this.#passwordPlain = o.default;
    this.#path = o.path
    this.#isDirty = false;
    allInstances.push(this);
  }

  get password(): string {
    return this.#passwordPlain;
  }

  get isDirty(): boolean {
    return this.#isDirty;
  }

  set password(newValue: string) {
    this.#passwordPlain = newValue;
    this.#isDirty = true;
  }

  reset() {
    this.#passwordPlain = '<Unset Password>';
  }

  toYaml(config: YAMLMap) {
      config.setIn([...this.#path, 'pt'] , this.#passwordPlain);
  }

  fromYaml(config: YAMLMap) {
    const n = config.getIn([...this.#path, 'enc_pw']);
    if (n !== undefined && n !== null) {
      const v = (typeof n === 'object' && 'value' in n) ? n.value : n;
      if (typeof v === "string") {
        this.#passwordPlain = v as string;
      }
    }
  }
}
