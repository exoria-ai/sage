/**
 * Vitest Setup File
 *
 * Runs before all tests. Use for global mocks, environment setup, etc.
 */

import { vi, afterEach } from 'vitest';

// Note: NODE_ENV is set by vitest automatically

// Mock console.error to avoid noisy test output for expected errors
// Tests can still check if console.error was called
vi.spyOn(console, 'error').mockImplementation(() => {});

// Reset mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});
