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

// Pattern to detect segmented APNs (with separators like dash, space, dot)
// Captures 3 segments with 1-4 digits each
const APN_SEGMENTED_PATTERN = /^(\d{1,4})[\s.\-]+(\d{1,4})[\s.\-]+(\d{1,4})$/;

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
 * - Missing leading zeros: 3-25-102 → 003-025-102
 *
 * Strips all non-digits, validates total count (9-10), then parses as:
 * - First 3 digits: map book
 * - Next 3 digits: page
 * - Remaining 3-4 digits: parcel (trailing 0 added if 9 total)
 *
 * Always returns a 10-digit numeric value for database queries.
 */
export function parseAPN(apn: string): ParsedAPN | null {
  const trimmed = apn.trim();

  // First, strip all non-digit characters for total digit count
  const digitsOnly = trimmed.replace(/\D/g, '');

  // Check for segmented format with SHORT segments (needs padding)
  // Only use segment-aware parsing when at least one segment is < 3 digits
  // This handles cases like "3-25-102" but not "0169-240-080"
  const segmentMatch = trimmed.match(APN_SEGMENTED_PATTERN);
  if (segmentMatch) {
    const [, book, page, parcel] = segmentMatch;
    // Only use segmented parsing if it would add leading zeros
    // (i.e., at least one segment is shorter than expected)
    const needsPadding = book!.length < 3 || page!.length < 3 || parcel!.length < 3;

    if (needsPadding) {
      // Pad each segment to 3 digits (parcel can be 3-4 digits)
      const mapBook = book!.padStart(3, '0');
      const pageNum = page!.padStart(3, '0');
      // Parcel: if 4 digits provided, keep as-is (includes trailing 0)
      // Otherwise pad to 3 digits
      const parcelNum = parcel!.length === 4 ? parcel! : parcel!.padStart(3, '0');

      // Build the 10-digit database value
      const segmentDigits = mapBook + pageNum + parcelNum;
      let numericValue = segmentDigits;
      if (numericValue.length === 9) {
        numericValue = numericValue + '0';
      }

      // For display, show the 3-digit parcel (without trailing 0)
      const displayParcel = parcelNum.length === 4 ? parcelNum.slice(0, 3) : parcelNum;

      return {
        raw: apn,
        formatted: `${mapBook}-${pageNum}-${displayParcel}`,
        mapBook,
        page: pageNum,
        parcel: displayParcel,
        numeric: numericValue,
      };
    }
  }

  // Standard path: validate digit count and parse positionally
  // This handles both properly formatted and AI-misformatted APNs
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
 * - Pads segments with leading zeros when separators are present (3-25-102 → 0030251020)
 * - Adds trailing 0 if 9 digits (converts human format to database format)
 * - Returns ONLY digits to prevent SQL injection
 *
 * @example
 * normalizeApnForQuery('003-025-102')  // '0030251020'
 * normalizeApnForQuery('3-25-102')     // '0030251020' (missing leading zeros)
 * normalizeApnForQuery('0030251020')   // '0030251020'
 * normalizeApnForQuery('003025102')    // '0030251020'
 * normalizeApnForQuery("'; DROP TABLE")  // '' (invalid chars stripped)
 */
export function normalizeApnForQuery(apn: string): string {
  const trimmed = apn.trim();

  // Check for segmented format with short segments (needs padding)
  const segmentMatch = trimmed.match(APN_SEGMENTED_PATTERN);
  if (segmentMatch) {
    const [, book, page, parcel] = segmentMatch;
    // Only use segmented parsing if it would add leading zeros
    const needsPadding = book!.length < 3 || page!.length < 3 || parcel!.length < 3;

    if (needsPadding) {
      const mapBook = book!.padStart(3, '0');
      const pageNum = page!.padStart(3, '0');
      const parcelNum = parcel!.length === 4 ? parcel! : parcel!.padStart(3, '0');
      let normalized = mapBook + pageNum + parcelNum;
      if (normalized.length === 9) {
        normalized = normalized + '0';
      }
      return normalized;
    }
  }

  // Fallback: strip everything except digits to prevent SQL injection
  let normalized = trimmed.replace(/[^0-9]/g, '');
  if (/^\d{9}$/.test(normalized)) {
    normalized = normalized + '0';
  }
  return normalized;
}

