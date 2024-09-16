import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'), // Set up '~' as alias for 'src'
    },
  },
  server: {
    port: 3000, // Specify the port for the development server
  },
});
