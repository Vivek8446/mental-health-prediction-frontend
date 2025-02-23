import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'simple-peer': 'simple-peer/simplepeer.min.js',
    }
  },
  define: {
    'process.env': {},
    global: 'window',
  }
});