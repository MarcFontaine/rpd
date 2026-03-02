import { ConfigVar } from '../config/ConfigVar.svelte';

export const showSwrMeter = new ConfigVar(
    { default: true
    , path: [ 'rigpage', 'current_config', 'SwrMeter', 'showSwrMeter' ]
    });

export const u_min = new ConfigVar(
    { default: 0.142
    , path: [ 'rigpage', 'current_config', 'SwrMeter', 'u_min' ]
    });

export const u_max = new ConfigVar(
    { default: 2.6
    , path: [ 'rigpage', 'current_config', 'SwrMeter', 'u_max' ]
    });

export const p_max = new ConfigVar(
    { default: 150
    , path: [ 'rigpage', 'current_config', 'SwrMeter', 'p_max' ]
    });

export const espSwrMeterEnable = new ConfigVar(
    { default: false
    , path: [ 'rigpage', 'current_config', 'SwrMeter', 'ESPMeter', 'enable' ]
    });

export const espSwrMeterUrl = new ConfigVar(
    { default: ''
    , path: [ 'rigpage', 'current_config', 'SwrMeter', 'ESPMeter', 'URL' ]
    });
