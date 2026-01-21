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

// Match 9-10 digit APNs with optional dashes
// Standard 9-digit: XXX-XXX-XXX (human format, needs trailing 0 added)
// Database 10-digit: XXX-XXX-XXXX (already has trailing 0)
const APN_PATTERN = /^(\d{3})-?(\d{3})-?(\d{3,4})$/;

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
 * Accepts both 9-digit human format (003-025-102) and 10-digit database
 * format (0030251020). Always returns a 10-digit numeric value for queries.
 */
export function parseAPN(apn: string): ParsedAPN | null {
  const cleaned = apn.trim().replace(/\s+/g, '');
  const match = cleaned.match(APN_PATTERN);

  if (!match) {
    return null;
  }

  const [, mapBook, page, parcelRaw] = match;

  // Normalize parcel to 3 digits for display, but keep 4 if provided
  // For database queries, ensure we have 10 total digits (add trailing 0 if needed)
  let parcel = parcelRaw!;
  let numericValue = `${mapBook}${page}${parcel}`;

  // If 9 digits, add trailing 0 to match database format
  if (numericValue.length === 9) {
    numericValue = numericValue + '0';
  }

  // For display, show the 3-digit parcel without the trailing 0
  const displayParcel = parcel.length === 4 ? parcel.slice(0, 3) : parcel;

  return {
    raw: apn,
    formatted: `${mapBook}-${page}-${displayParcel}`,
    mapBook: mapBook!,
    page: page!,
    parcel: displayParcel,
    numeric: numericValue,
  };
}

