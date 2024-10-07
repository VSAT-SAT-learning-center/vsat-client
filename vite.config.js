import react from '@vitejs/plugin-react';
import path from 'path'; // Import path module to resolve alias
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '~': path.resolve(__dirname, 'src'), // Set '~' to point to 'src' directory
    },
  },
});
