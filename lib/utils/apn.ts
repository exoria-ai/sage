/**
 * APN (Assessor's Parcel Number) Utilities
 *
 * Validation and formatting for Solano County APNs.
 *
 * IMPORTANT: Solano County parcelid field is always 10 digits ending in 0.
 * Format: BBB-PPP-NNN0 where:
 *   - BBB = 3-digit map book (zero-padded)
 *   - PPP = 3-digit page (zero-padded)
 *   - NNN = 3-digit parcel number (zero-padded)
 *   - 0 = trailing zero (always present in database)
 *
 * Users commonly input 9-digit APNs (e.g., "003-025-102") which must be
 * converted to 10 digits (e.g., "0030251020") for database queries.
 */

// Match 9-10 digit APNs with optional dashes in any position
// This is lenient to handle common AI/user formatting variations like:
// - Standard 9-digit: XXX-XXX-XXX (human format, needs trailing 0 added)
// - Database 10-digit: XXX-XXX-XXXX or XXXXXXXXXX (already has trailing 0)
// - Misformatted: XXXX-XXX-XXX (AI agents often try this)
//
// We strip all non-digits and validate the total count (9-10 digits).
// The canonical format is always BBB-PPP-NNN (3-3-3).
const APN_DIGIT_ONLY_PATTERN = /^\d{9,10}$/;

export interface ParsedAPN {
  raw: string;
  formatted: string;      // Human-readable with dashes (XXX-XXX-XXX)
  mapBook: string;
  page: string;
  parcel: string;
  numeric: string;        // 10-digit database format (always ends in 0)
}

/**
 * Parse and validate an APN string.
 *
 * Accepts APNs in various formats:
 * - Standard 9-digit: 003-025-102, 003025102
 * - Database 10-digit: 003-025-1020, 0030251020
 * - Misformatted (AI-friendly): 0169-240-080, 0169 240 080
 *
 * Strips all non-digits, validates total count (9-10), then parses as:
 * - First 3 digits: map book
 * - Next 3 digits: page
 * - Remaining 3-4 digits: parcel (trailing 0 added if 9 total)
 *
 * Always returns a 10-digit numeric value for database queries.
 */
export function parseAPN(apn: string): ParsedAPN | null {
  // Strip all non-digit characters (handles dashes, spaces, any separator)
  const digitsOnly = apn.replace(/\D/g, '');

  // Validate: must be exactly 9 or 10 digits
  if (!APN_DIGIT_ONLY_PATTERN.test(digitsOnly)) {
    return null;
  }

  // Parse into components (always 3-3-3 or 3-3-4 from the digit string)
  const mapBook = digitsOnly.slice(0, 3);
  const page = digitsOnly.slice(3, 6);
  const parcelWithMaybeTrailing = digitsOnly.slice(6);

  // Build the 10-digit database value
  let numericValue = digitsOnly;
  if (numericValue.length === 9) {
    numericValue = numericValue + '0';
  }

  // For display, show the 3-digit parcel (without trailing 0)
  const displayParcel = parcelWithMaybeTrailing.length === 4
    ? parcelWithMaybeTrailing.slice(0, 3)
    : parcelWithMaybeTrailing;

  return {
    raw: apn,
    formatted: `${mapBook}-${page}-${displayParcel}`,
    mapBook,
    page,
    parcel: displayParcel,
    numeric: numericValue,
  };
}

/**
 * Normalize an APN string to 10-digit database format for safe SQL queries.
 *
 * This is a simpler alternative to parseAPN() when you only need the
 * numeric value for database queries and don't need full validation.
 *
 * - Strips dashes and spaces
 * - Adds trailing 0 if 9 digits (converts human format to database format)
 * - Returns ONLY digits to prevent SQL injection
 *
 * @example
 * normalizeApnForQuery('003-025-102')  // '0030251020'
 * normalizeApnForQuery('0030251020')   // '0030251020'
 * normalizeApnForQuery('003025102')    // '0030251020'
 * normalizeApnForQuery("'; DROP TABLE")  // '' (invalid chars stripped)
 */
export function normalizeApnForQuery(apn: string): string {
  // Strip everything except digits to prevent SQL injection
  let normalized = apn.replace(/[^0-9]/g, '');
  if (/^\d{9}$/.test(normalized)) {
    normalized = normalized + '0';
  }
  return normalized;
}

