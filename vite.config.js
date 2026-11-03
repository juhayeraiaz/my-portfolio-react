import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Copies the built index.html to 404.html so static hosts (GitHub Pages,
 * Netlify, Cloudflare Pages, …) serve the SPA for deep links such as
 * /addprojects and let the client-side router render the 404 page.
 */
function spaFallback() {
  let outDir = 'build';
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  build: {
    // Keep CRA's output folder so existing deploy settings continue to work.
    outDir: 'build',
    target: 'es2022',
    rollupOptions: {
      output: {
        // Long-term cache the framework separately from frequently-changing app code.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'vendor';
          return undefined;
        },
      },
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
    restoreMocks: true,
  },
});
