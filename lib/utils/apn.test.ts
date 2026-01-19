/**
 * APN Utility Tests
 *
 * Tests for Assessor's Parcel Number parsing and validation.
 */

import { describe, it, expect } from 'vitest';
import { parseAPN, ParsedAPN } from './apn';

describe('parseAPN', () => {
  describe('valid APNs', () => {
    it('parses 9-digit APN with dashes', () => {
      const result = parseAPN('003-025-102');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
      expect(result!.mapBook).toBe('003');
      expect(result!.page).toBe('025');
      expect(result!.parcel).toBe('102');
      expect(result!.numeric).toBe('003025102');
    });

    it('parses 9-digit APN without dashes', () => {
      const result = parseAPN('003025102');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
      expect(result!.numeric).toBe('003025102');
    });

    it('parses 10-digit APN with dashes (4-digit parcel)', () => {
      const result = parseAPN('123-456-7890');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('123-456-7890');
      expect(result!.mapBook).toBe('123');
      expect(result!.page).toBe('456');
      expect(result!.parcel).toBe('7890');
      expect(result!.numeric).toBe('1234567890');
    });

    it('parses 10-digit APN without dashes', () => {
      const result = parseAPN('1234567890');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('123-456-7890');
      expect(result!.numeric).toBe('1234567890');
    });

    it('preserves raw input', () => {
      const result = parseAPN('003-025-102');
      expect(result!.raw).toBe('003-025-102');

      const result2 = parseAPN('  003025102  ');
      expect(result2!.raw).toBe('  003025102  ');
    });

    it('trims whitespace', () => {
      const result = parseAPN('  003-025-102  ');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
    });

    it('removes internal whitespace', () => {
      const result = parseAPN('003 025 102');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
    });
  });

  describe('invalid APNs', () => {
    it('returns null for empty string', () => {
      expect(parseAPN('')).toBeNull();
    });

    it('returns null for whitespace only', () => {
      expect(parseAPN('   ')).toBeNull();
    });

    it('returns null for too few digits', () => {
      expect(parseAPN('12345678')).toBeNull(); // 8 digits
      expect(parseAPN('003-025-10')).toBeNull(); // 2-digit parcel
    });

    it('returns null for too many digits', () => {
      expect(parseAPN('12345678901')).toBeNull(); // 11 digits
      expect(parseAPN('003-025-10234')).toBeNull(); // 5-digit parcel
    });

    it('returns null for non-numeric characters', () => {
      expect(parseAPN('003-025-10A')).toBeNull();
      expect(parseAPN('ABC-DEF-GHI')).toBeNull();
      expect(parseAPN('003.025.102')).toBeNull(); // Wrong separator
    });

    it('accepts partial dashes (dashes are optional)', () => {
      // The parser is lenient - dashes are optional at any position
      expect(parseAPN('003-025102')).not.toBeNull(); // First dash only
      expect(parseAPN('003025-102')).not.toBeNull(); // Second dash only
      expect(parseAPN('003-025102')!.formatted).toBe('003-025-102');
      expect(parseAPN('003025-102')!.formatted).toBe('003-025-102');
    });
  });

  describe('edge cases', () => {
    it('handles leading zeros correctly', () => {
      const result = parseAPN('000-001-002');

      expect(result).not.toBeNull();
      expect(result!.mapBook).toBe('000');
      expect(result!.page).toBe('001');
      expect(result!.parcel).toBe('002');
    });

    it('handles maximum values', () => {
      const result = parseAPN('999-999-9999');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('999-999-9999');
    });
  });
});
