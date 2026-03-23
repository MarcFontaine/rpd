import { replace } from 'svelte-spa-router'
import { parseDocument, isMap, YAMLMap } from 'yaml';

import * as Profile from '../profile';

import { Document } from 'yaml';
import { allFromYaml, allToYaml, allReset } from './ConfigVar.svelte';

export const updateYaml =  $state({trigger : 1});

const emptyConfig = new Document(
  { rigpage: {
    profiles: {
      DemoMode: {
	cat: {
	  demoMode: true,
	  webserial: false,
	  rigctld: false
	  },
	config: { name: 'Demo Mode'},
      },
      SerialPort: {
	cat: {
	  demoMode: false,
	  webserial: true,
	  rigctld: false
	  },
	config: { name: 'Serial Port'},
      }
    }
   }
  }
);

var config = emptyConfig.clone();

export function setConfig(c: Document) {
  config = c;
}

export function getConfig() {
  return config;
}

export var profile = null as null | YAMLMap;

export function setProfile(p: unknown) {
  profile = p as YAMLMap;
  if (isMap(profile)) {
    allFromYaml(profile);
    allToYaml(profile);
  }
  updateYaml.trigger++;
}

export function mergeProfile(p: unknown) {
  if (isMap(p)) {
    allFromYaml(p as YAMLMap);
    allToYaml(profile as YAMLMap);
  }
  updateYaml.trigger++;
}

export function updateSettings() {
  if (isMap(profile)) {
    allToYaml(profile as YAMLMap);
  }
  updateYaml.trigger++;
}

export function getProfiles() {
  return (config.getIn([ 'rigpage','profiles' ]));
}

export async function startProfile() {
  Profile.initProfile();
};

// Validate the config stored in local storage.
export function validateConfig(j: string) {
  const doc = parseDocument(j);
  if ( ! doc.getIn([ 'rigpage','profiles' ])) {
    return emptyConfig.clone();
  }
  return doc;
}

// Validate a single profile (from Download)
export function validateProfile(j: string) {
  const doc = parseDocument(j);
  return doc;
}

export function reset() {
  localStorage.clear();
  config = emptyConfig.clone();
  replace('/');
  allReset();
  updateYaml.trigger++;
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
    setConfig(validateConfig(cfg));
  }
  else
  {
    console.log('loadFromLocalStorage : config not found');
  }
}
