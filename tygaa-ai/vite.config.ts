import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  // Fall back to '/' if BASE_PATH is not defined in Cloudflare
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    // Standard build folder for Cloudflare Pages
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    host: '0.0.0.0',
  },
});
