import type { ManifestOptions } from 'vite-plugin-pwa';

export const webmanifest: Partial<ManifestOptions> = {
  "short_name": "XK852 rig control",
  "name": "XK852 rig control",
  "theme_color": "#ffffff",
    "display": "standalone",
  "icons": [
    {
      "src": "images/icons-1024.png",
      "type": "image/png",
      "sizes": "1024x1024",
      "purpose": "any maskable"
    },
    {
      "src": "images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "any"
    },
    {
      "src": "images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "any"
    },
    {
      "src": "images/icons-192-maskable.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "maskable"
    },
    {
      "src": "images/icons-512-maskable.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "maskable"
    }
  ],
  "start_url": "./?source=pwa",
  "scope": "./",
  "id": "./"
} as const;
