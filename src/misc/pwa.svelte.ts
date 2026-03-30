import { useRegisterSW } from 'virtual:pwa-register/svelte';

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({});

export const pwa = $state({
  isOfflineReady: false,
  needRefresh: false,
  ignoreUpdate() {
    offlineReady.set(false);
    needRefresh.set(false);
    console.log("SW update ignored");
  },
  update: () => updateServiceWorker(true)
});

offlineReady.subscribe(v => {
  pwa.isOfflineReady = v;
  console.log("pwa.isOfflineReady:", v);
});
needRefresh.subscribe(v => {
  pwa.needRefresh = v;
  console.log("pwa.needRefresh:", v);
});