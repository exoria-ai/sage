/**
 * APN (Assessor's Parcel Number) Utilities
 *
 * Validation and formatting for Solano County APNs.
 */

/**
 * Solano County APN format: XXX-XXX-XXX, XXX-XXX-XXXX, or XXXX-XXX-XXX
 * - First 3-4 digits: Map book number
 * - Middle 3 digits: Page number
 * - Last 3-4 digits: Parcel number
 *
 * May be provided with or without dashes.
 * Examples: "003-025-102", "0030251020", "123-456-7890", "0046-202-130"
 */

// Match 9-11 digit APNs with optional dashes
// Standard format: XXX-XXX-XXX or XXX-XXX-XXXX (9-10 digits)
// Extended format: XXXX-XXX-XXX (11 digits, 4-digit map book)
const APN_PATTERN = /^(\d{3,4})-?(\d{3})-?(\d{3,4})$/;

export interface ParsedAPN {
  raw: string;
  formatted: string;
  mapBook: string;
  page: string;
  parcel: string;
  numeric: string; // Without dashes, for database queries
}

/**
 * Parse and validate an APN string
 */
export function parseAPN(apn: string): ParsedAPN | null {
  const cleaned = apn.trim().replace(/\s+/g, '');
  const match = cleaned.match(APN_PATTERN);

  if (!match) {
    return null;
  }

  const [, mapBook, page, parcel] = match;

  return {
    raw: apn,
    formatted: `${mapBook}-${page}-${parcel}`,
    mapBook: mapBook!,
    page: page!,
    parcel: parcel!,
    numeric: `${mapBook}${page}${parcel}`,
  };
}

