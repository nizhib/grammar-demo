import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
