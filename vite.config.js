import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ command }) => {
  console.log('Vite Command:', command, 'Base Path:', command === 'build' ? '/invoice-app/' : '/');
  return {
    plugins: [react(), tailwindcss()],
    
    // The Magic Fix: Only use the GitHub path when building for production
    base: '/invoice-app/',
    // Keep your path alias if you added it earlier
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
  }
})
