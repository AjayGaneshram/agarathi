import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: "autoUpdate", // ✅ Auto-update service worker when new content is available
      workbox: {
        cleanupOutdatedCaches: true, // ✅ Remove old caches
        clientsClaim: true, // ✅ Take control of uncontrolled clients
        skipWaiting: true, // ✅ Activate SW immediately
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/ajayganeshram\.github\.io\/agarathi\/assets\/.*\.(js|css|png|jpg|svg|woff2?)$/, 
            handler: "CacheFirst", 
            options: {
              cacheName: "static-assets",
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/ajayganeshram\.github\.io\/agarathi\/.*$/, 
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "dynamic-content",
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      strategies: "generateSW", // ✅ Automatically generates the service worker
      manifest: {
        short_name: "அகராதி",
        name: "Agarathi App",
        icons: [],
        start_url: "/agarathi/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
      },
       // ✅ Detects a new update and triggers an event
       devOptions: { enabled: true },
    }),
  ],
  base: "/agarathi/",
  css: {
    postcss: { plugins: [tailwindcss()] },
  },
  build: {
    outDir: "dist",
    charset: "utf-8",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      }
    },
    assetsInlineLimit: 0,
    rollupOptions: {
      input: { main: "index.html" },
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
})
