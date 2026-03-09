import { parseDocument, isMap } from 'yaml';

import * as Profile from '../profile';

import { Document } from 'yaml';
import { allFromYaml, allToYaml, allReset } from './ConfigVar.svelte';

var config = new Document({ rigpage: {current_config: {}} })

export function setConfig( c:Document ) {
  config = c;
  const n = config.getIn([ 'rigpage','current_config' ]);
  if (isMap(n)) {
    allFromYaml(n);
  }
}

export function getConfig() {
  const n = config.getIn([ 'rigpage','current_config' ]);
  if (isMap(n)) {
    allToYaml(n);
  }
  return config;
}

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
