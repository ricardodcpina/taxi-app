import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 80,
    proxy: {
      '/ride': 'http://localhost:8080',
      '/driver': 'http://localhost:8080',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 80,
    proxy: {
      '/ride': `http://${process.env.VITE_BACKEND_DOMAIN}:8080`,
      '/driver': `http://${process.env.VITE_BACKEND_DOMAIN}:8080`,
    },
  },
});
