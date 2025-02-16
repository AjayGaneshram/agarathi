import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
export default defineConfig({
  plugins: [react()],
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
