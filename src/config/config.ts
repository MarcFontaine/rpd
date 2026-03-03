import { parseDocument } from 'yaml';

import * as Profile from '../profile';
import { allReset } from './ConfigVar.svelte';
import { setConfig, getConfig } from '../state.svelte';

export async function startProfile() {
  Profile.initProfile();
};

export function validateProfile(j: string) {
  const doc = parseDocument(j);
  return doc
}

export function reset() {
  localStorage.clear()
  allReset();
}

export function saveToLocalStorage() {
  console.log('saveToLocalStorage');
  localStorage.setItem('config', getConfig().toString())
}

export function autoSaveToLocalStorage() {
  console.log('autoSaveToLocalStorage');
  localStorage.setItem('config_auto_save', getConfig().toString())
}

export function loadFromLocalStorage() {
  console.log('loadFromLocalStorage');
  const cfg = localStorage.getItem('config')
  if (cfg) {
    setConfig(validateProfile(cfg));
  }
  else
  {
    console.log('loadFromLocalStorage : config not found');
  }
}

export const localSerial = {
  name: 'WebSerial using local serial port',
  decription: 'WebSerial using local serial port',
  links:
    [ {type: 'WebSerial'} ]
};
