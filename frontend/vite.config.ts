import {defineConfig} from 'vite';
// noinspection ES6UnusedImports
import {} from 'vitest';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  test:{
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup-tests.ts',
  }
})
