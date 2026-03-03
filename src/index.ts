import { setGuiMode, GuiMode } from './gui';
import { loadFromLocalStorage , autoSaveToLocalStorage } from './config/config';
import { mount } from 'svelte'
import App from './ui/App.svelte'

loadFromLocalStorage();

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
