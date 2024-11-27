import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    proxy: {
      '/ride': 'http://localhost:8080',
      '/driver': 'http://localhost:8080',
    },
  },
  preview: {
    port: 80,
    proxy: {
      '/ride': `http://backend:8080`,
      '/driver': 'http://backend:8080',
    },
  },
});
