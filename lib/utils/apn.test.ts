/**
 * APN Utility Tests
 *
 * Tests for Assessor's Parcel Number parsing and validation.
 *
 * IMPORTANT: Solano County parcelid is always 10 digits ending in 0.
 * Human-readable format: XXX-XXX-XXX (9 digits)
 * Database format: XXXXXXXXX0 (10 digits, trailing 0)
 */

import { describe, it, expect } from 'vitest';
import { parseAPN, normalizeApnForQuery } from './apn';

describe('parseAPN', () => {
  describe('9-digit to 10-digit conversion', () => {
    it('adds trailing 0 to 9-digit APN with dashes', () => {
      const result = parseAPN('003-025-102');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
      expect(result!.mapBook).toBe('003');
      expect(result!.page).toBe('025');
      expect(result!.parcel).toBe('102');
      // Critical: numeric should be 10 digits for database query
      expect(result!.numeric).toBe('0030251020');
    });

    it('adds trailing 0 to 9-digit APN without dashes', () => {
      const result = parseAPN('003025102');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
      expect(result!.numeric).toBe('0030251020');
    });

    it('converts Admin Center APN correctly', () => {
      // Known parcel: Solano County Admin Building at 601 Texas St
      const result = parseAPN('003-025-102');

      expect(result).not.toBeNull();
      expect(result!.numeric).toBe('0030251020');
    });
  });

  describe('10-digit APNs (already in database format)', () => {
    it('preserves 10-digit APN with dashes', () => {
      const result = parseAPN('003-025-1020');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102'); // Display without trailing 0
      expect(result!.numeric).toBe('0030251020');    // Keep full 10 digits
    });

    it('preserves 10-digit APN without dashes', () => {
      const result = parseAPN('0030251020');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
      expect(result!.numeric).toBe('0030251020');
    });

    it('handles various database-format APNs', () => {
      // Sample real parcelids from Solano County
      expect(parseAPN('0032200100')!.numeric).toBe('0032200100');
      expect(parseAPN('0080140110')!.numeric).toBe('0080140110');
      expect(parseAPN('0046220290')!.numeric).toBe('0046220290');
    });
  });

  describe('display formatting', () => {
    it('shows 3-digit parcel in formatted output', () => {
      const result9 = parseAPN('003-025-102');
      expect(result9!.formatted).toBe('003-025-102');
      expect(result9!.parcel).toBe('102');

      const result10 = parseAPN('003-025-1020');
      expect(result10!.formatted).toBe('003-025-102');
      expect(result10!.parcel).toBe('102');
    });

    it('preserves raw input', () => {
      expect(parseAPN('003-025-102')!.raw).toBe('003-025-102');
      expect(parseAPN('  003025102  ')!.raw).toBe('  003025102  ');
      expect(parseAPN('0030251020')!.raw).toBe('0030251020');
    });
  });

  describe('whitespace handling', () => {
    it('trims leading/trailing whitespace', () => {
      const result = parseAPN('  003-025-102  ');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
      expect(result!.numeric).toBe('0030251020');
    });

    it('removes internal whitespace', () => {
      const result = parseAPN('003 025 102');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
      expect(result!.numeric).toBe('0030251020');
    });
  });

  describe('partial dash handling', () => {
    it('accepts first dash only', () => {
      const result = parseAPN('003-025102');
      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
      expect(result!.numeric).toBe('0030251020');
    });

    it('accepts second dash only', () => {
      const result = parseAPN('003025-102');
      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('003-025-102');
      expect(result!.numeric).toBe('0030251020');
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
      expect(parseAPN('12345678')).toBeNull();   // 8 digits
      expect(parseAPN('003-025-10')).toBeNull(); // 2-digit parcel
    });

    it('returns null for too many digits', () => {
      expect(parseAPN('12345678901')).toBeNull();  // 11 digits
      expect(parseAPN('003-025-10234')).toBeNull(); // 5-digit parcel
    });

    it('returns null for non-numeric characters', () => {
      expect(parseAPN('003-025-10A')).toBeNull();
      expect(parseAPN('ABC-DEF-GHI')).toBeNull();
      expect(parseAPN('003.025.102')).toBeNull(); // Wrong separator
    });

    it('returns null for 4-digit book numbers', () => {
      // Old format assumed 4-digit book, but actual data shows 3-digit book
      expect(parseAPN('0046-202-130')).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('handles leading zeros in all segments', () => {
      const result = parseAPN('000-001-002');

      expect(result).not.toBeNull();
      expect(result!.mapBook).toBe('000');
      expect(result!.page).toBe('001');
      expect(result!.parcel).toBe('002');
      expect(result!.numeric).toBe('0000010020');
    });

    it('handles all nines', () => {
      const result = parseAPN('999-999-999');

      expect(result).not.toBeNull();
      expect(result!.formatted).toBe('999-999-999');
      expect(result!.numeric).toBe('9999999990');
    });
  });
});

describe('normalizeApnForQuery', () => {
  describe('9-digit conversion', () => {
    it('adds trailing 0 to 9-digit APN with dashes', () => {
      expect(normalizeApnForQuery('003-025-102')).toBe('0030251020');
    });

    it('adds trailing 0 to 9-digit APN without dashes', () => {
      expect(normalizeApnForQuery('003025102')).toBe('0030251020');
    });

    it('handles spaces', () => {
      expect(normalizeApnForQuery('003 025 102')).toBe('0030251020');
    });
  });

  describe('10-digit passthrough', () => {
    it('preserves 10-digit APN', () => {
      expect(normalizeApnForQuery('0030251020')).toBe('0030251020');
    });

    it('strips dashes from 10-digit APN', () => {
      expect(normalizeApnForQuery('003-025-1020')).toBe('0030251020');
    });
  });

  describe('non-standard input', () => {
    it('passes through non-9-digit values unchanged (after stripping)', () => {
      // 8 digits - not modified
      expect(normalizeApnForQuery('12345678')).toBe('12345678');
      // 11 digits - not modified
      expect(normalizeApnForQuery('12345678901')).toBe('12345678901');
    });
  });
});
