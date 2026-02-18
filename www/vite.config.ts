import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/assets-proxy': {
        target: 'https://assets.stephenhamilton.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets-proxy/, '/portfolio'),
      },
    },
  },
  resolve: {
    alias: {
      constants: path.resolve(__dirname, 'src/constants'),
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      store: path.resolve(__dirname, 'src/store'),
      services: path.resolve(__dirname, 'src/services'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
});
