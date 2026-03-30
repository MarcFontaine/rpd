import './misc/pwa.svelte.ts'; // Side-Effect: start Update-Service-Worker
import { setGuiMode, GuiMode } from './gui';
import { loadFromLocalStorage , autoSaveToLocalStorage } from './config/config.svelte';
import { mount } from 'svelte'
import { initCatchAllErrors } from './state.svelte';
import App from './ui/App.svelte'

loadFromLocalStorage();
initCatchAllErrors();

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    autoSaveToLocalStorage();
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  mount(App, {
    target: document.getElementById('app')!,
  })
  setGuiMode(GuiMode.NotConnected);
});
