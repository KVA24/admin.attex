import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react(),],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
    port: 4000
  },
})
