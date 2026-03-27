import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/invoice-app',
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src/assets'),
      '@': path.resolve(__dirname, './src/components'),
    },
  },
})
