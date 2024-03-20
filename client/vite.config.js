import React from 'react';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: 'react', // Specify the JSX flavor (can be 'react' or 'vue')
  },
});
