/**
 * APN (Assessor's Parcel Number) Utilities
 *
 * Validation and formatting for Solano County APNs.
 */

/**
 * Solano County APN format: XXX-XXX-XXX or XXX-XXX-XXXX
 * - First 3 digits: Map book number
 * - Middle 3 digits: Page number
 * - Last 3-4 digits: Parcel number (can be 3 or 4 digits)
 *
 * May be provided with or without dashes.
 * Examples: "003-025-102", "0030251020", "123-456-7890"
 */

// Match 9-10 digit APNs with optional dashes
const APN_PATTERN = /^(\d{3})-?(\d{3})-?(\d{3,4})$/;

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

/**
 * Validate an APN string
 */
export function isValidAPN(apn: string): boolean {
  return parseAPN(apn) !== null;
}

/**
 * Format an APN with dashes
 */
export function formatAPN(apn: string): string | null {
  const parsed = parseAPN(apn);
  return parsed?.formatted ?? null;
}

/**
 * Convert APN to query format (may vary by layer)
 * Some layers use dashes, some don't
 */
export function apnToQuery(apn: string, withDashes = true): string | null {
  const parsed = parseAPN(apn);
  if (!parsed) return null;

  return withDashes ? parsed.formatted : parsed.numeric;
}

/**
 * Generate SQL WHERE clause for APN query
 * Handles field name variations across different layers
 */
export function apnWhereClause(
  apn: string,
  fieldName = 'APN'
): string | null {
  const parsed = parseAPN(apn);
  if (!parsed) return null;

  // Try both formats since different layers use different conventions
  return `${fieldName} = '${parsed.formatted}' OR ${fieldName} = '${parsed.numeric}'`;
}
