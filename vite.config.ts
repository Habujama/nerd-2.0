import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'NERD Interface',
        short_name: 'NERD 2.0',
        description: '',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'minimal-ui',
        start_url: "./index.html",
        id: './index.html',
       icons: [
          {
            src: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
         },
           {
            src: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
         },
        {
            src: '/icons/favicon-square.png',
            sizes: '512x512',
            type: 'image/png'
         },
          {
            src: '/icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: '/icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
         },
          {
            src: '/icons/favicon.png',
            sizes: '760x708',
            type: 'image/png'
         },
        ],
        screenshots: [
          {
            src: '/screenshots/preview-mobile.png',
            sizes: '540x720',
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/screenshots/preview-desktop.png',
            sizes: '1200x800',
            type: 'image/png',
            form_factor: 'wide'
          }
        ]
      },
    })
  ],
})
