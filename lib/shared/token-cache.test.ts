/**
 * Token Cache Tests
 *
 * Tests for the generic token caching utility.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTokenCache, getArcGISToken } from './token-cache';

describe('createTokenCache', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('basic operations', () => {
    it('returns null when empty', () => {
      const cache = createTokenCache();
      expect(cache.get()).toBeNull();
      expect(cache.isValid()).toBe(false);
    });

    it('stores and retrieves a token', () => {
      const cache = createTokenCache();

      cache.set('my-token', 3600); // 1 hour

      expect(cache.get()).toBe('my-token');
      expect(cache.isValid()).toBe(true);
    });

    it('clears the cache', () => {
      const cache = createTokenCache();

      cache.set('my-token', 3600);
      expect(cache.isValid()).toBe(true);

      cache.clear();
      expect(cache.get()).toBeNull();
      expect(cache.isValid()).toBe(false);
    });
  });

  describe('expiration', () => {
    it('returns token before expiry', () => {
      const cache = createTokenCache({ bufferMs: 60000 }); // 1 minute buffer

      cache.set('my-token', 3600); // 1 hour

      // Advance 30 minutes (still valid)
      vi.advanceTimersByTime(30 * 60 * 1000);

      expect(cache.get()).toBe('my-token');
    });

    it('returns null when within buffer of expiry', () => {
      const cache = createTokenCache({ bufferMs: 300000 }); // 5 minute buffer

      cache.set('my-token', 360); // 6 minutes

      // Advance 2 minutes (should still be valid - 4 minutes left, > 5 min buffer? No wait...)
      // Actually: expiry = now + 360*1000 = now + 360000
      // Buffer check: now >= expiry - buffer
      // At t=0: 0 >= 360000 - 300000 = 0 >= 60000 = false, valid
      // At t=60001: 60001 >= 60000 = true, invalid

      vi.advanceTimersByTime(60001);
      expect(cache.get()).toBeNull();
    });

    it('returns null after full expiry', () => {
      const cache = createTokenCache({ bufferMs: 0 });

      cache.set('my-token', 60); // 1 minute

      // Advance past expiry
      vi.advanceTimersByTime(61 * 1000);

      expect(cache.get()).toBeNull();
    });

    it('uses default 5-minute buffer', () => {
      const cache = createTokenCache(); // Default bufferMs = 300000 (5 min)

      cache.set('my-token', 600); // 10 minutes

      // At t=0: expiry = 600000, buffer check: 0 >= 600000-300000 = 0 >= 300000 = false, valid
      // At t=300000: 300000 >= 300000 = true, invalid

      vi.advanceTimersByTime(299999);
      expect(cache.get()).toBe('my-token');

      vi.advanceTimersByTime(2);
      expect(cache.get()).toBeNull();
    });
  });

  describe('overwrite behavior', () => {
    it('overwrites existing token', () => {
      const cache = createTokenCache();

      cache.set('token-1', 3600);
      expect(cache.get()).toBe('token-1');

      cache.set('token-2', 3600);
      expect(cache.get()).toBe('token-2');
    });

    it('resets expiry on overwrite', () => {
      const cache = createTokenCache({ bufferMs: 0 });

      cache.set('token-1', 60); // 1 minute

      // Advance 30 seconds
      vi.advanceTimersByTime(30 * 1000);

      // Overwrite with new token (should reset expiry)
      cache.set('token-2', 60);

      // Advance another 45 seconds (would be 75s from original set)
      vi.advanceTimersByTime(45 * 1000);

      // Should still be valid (only 45s since overwrite)
      expect(cache.get()).toBe('token-2');
    });
  });
});

describe('getArcGISToken', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns null if ARCGIS_CLIENT_ID is missing', async () => {
    process.env.ARCGIS_CLIENT_ID = undefined;
    process.env.ARCGIS_CLIENT_SECRET = 'secret';

    const result = await getArcGISToken();
    expect(result).toBeNull();
  });

  it('returns null if ARCGIS_CLIENT_SECRET is missing', async () => {
    process.env.ARCGIS_CLIENT_ID = 'client-id';
    process.env.ARCGIS_CLIENT_SECRET = undefined;

    const result = await getArcGISToken();
    expect(result).toBeNull();
  });

  it('returns null if both credentials are missing', async () => {
    process.env.ARCGIS_CLIENT_ID = undefined;
    process.env.ARCGIS_CLIENT_SECRET = undefined;

    const result = await getArcGISToken();
    expect(result).toBeNull();
  });

  // Note: Full integration tests for getArcGISToken would require mocking fetch
  // These are left as integration tests that can be run against the real API
});
