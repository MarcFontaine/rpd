import { ConfigVar } from '../config/ConfigVar.svelte';

export const showSwrMeter = new ConfigVar(
    { default: true
    , path: [ 'swrMeter', 'showSwrMeter' ]
    });

export const u_min = new ConfigVar(
    { default: 0.142
    , path: [ 'swrMeter', 'u_min' ]
    });

export const u_max = new ConfigVar(
    { default: 2.6
    , path: [ 'swrMeter', 'u_max' ]
    });

export const p_max = new ConfigVar(
    { default: 150
    , path: [ 'swrMeter', 'p_max' ]
    });

export const espSwrMeterEnable = new ConfigVar(
    { default: false
    , path: [ 'swrMeter', 'ESPMeter', 'enable' ]
    });

export const espSwrMeterUrl = new ConfigVar(
    { default: ''
    , path: [ 'swrMeter', 'ESPMeter', 'URL' ]
    });
