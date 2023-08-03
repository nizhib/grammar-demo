/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, UserConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const config: UserConfig = defineConfig({
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

export default config;
