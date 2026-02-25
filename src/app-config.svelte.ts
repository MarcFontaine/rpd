import { getContext, setContext } from 'svelte';
import { Document } from 'yaml';
const APP_CONFIG_KEY = Symbol('app-config');

export function setAppConfig() {
    const doc = new Document({ rigpage: {current_config: null} })

    return setContext(APP_CONFIG_KEY, doc);
}

export function getAppConfig() {
    return getContext<ReturnType<typeof setAppConfig>>(APP_CONFIG_KEY);
}
