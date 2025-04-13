import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  test: {
    environment: 'jsdom', // for DOM-based testing
    globals: true,         //so you can use `describe`, `it`, etc.
    setupFiles: './src/tests/setupTests.js', // ✅ (optional but recommended)
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
});
