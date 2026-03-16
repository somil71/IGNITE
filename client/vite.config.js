import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy dependencies into separate chunks
          vendor: ['react', 'react-dom', 'react-router-dom', '@clerk/react'],
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/messaging'],
          motion: ['framer-motion'],
        },
      },
    },
  },

  optimizeDeps: {
    // Exclude server-only modules
    exclude: ['firebase-admin'],
  },

  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
