import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',

    // Include test files
    include: ['**/*.test.ts', '**/*.spec.ts'],

    // Exclude node_modules and build artifacts
    exclude: ['node_modules', '.next', 'dist'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['lib/**/*.ts'],
      exclude: ['lib/**/*.test.ts', 'lib/**/*.spec.ts'],
    },

    // Global test timeout
    testTimeout: 10000,

    // Setup files to run before tests
    setupFiles: ['./tests/setup.ts'],
  },

  // Path aliases to match tsconfig
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
