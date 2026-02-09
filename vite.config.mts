import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
//import eslint from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'
import webmanifest from './src/manifest.json';
import Info from 'unplugin-info/vite';

export default defineConfig({
  base: './',
  plugins: [
//    eslint(),
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: webmanifest,
    }),
    Info()
  ]
})
