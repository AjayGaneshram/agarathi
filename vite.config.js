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
      },
      strategies: "generateSW", // ✅ Automatically generates the service worker
      manifest: {
        short_name: "Agarathi",
        name: "Agarathi App",
        icons: [],
        start_url: "/agarathi/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
      }
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
