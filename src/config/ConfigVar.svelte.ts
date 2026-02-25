export interface ConfigOptions<T> {
  default: T;
}

export class ConfigVar<T> {
  #value = $state() as T;
  
  constructor({ default: initialValue }: ConfigOptions<T>) {
    console.log(initialValue);
    this.#value = initialValue;
  }

  get value(): T {
    return this.#value;
  }

  set value(newValue: T) {
    console.log("Setter aufgerufen mit:", newValue);
    this.#value = newValue;
  }
}
