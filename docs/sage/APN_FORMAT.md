# Solano County APN Format & Parsing

This document describes the Assessor's Parcel Number (APN) format used in Solano County and SAGE's parsing approach.

## Database Format

Solano County stores parcel IDs as **10-digit strings** in the `parcelid` field:

```
0169240080
0030251020
0046202130
```

The format is `BBBPPPNNN0` where:
- `BBB` = 3-digit map book (001-999, zero-padded)
- `PPP` = 3-digit page (001-999, zero-padded)
- `NNN` = 3-digit parcel number (001-999, zero-padded)
- `0` = trailing zero (always present in database)

## Human-Readable Format

The canonical display format uses dashes: `BBB-PPP-NNN`

Examples:
- `016-924-008` (displayed) → `0169240080` (database)
- `003-025-102` (displayed) → `0030251020` (database)
- `004-620-213` (displayed) → `0046202130` (database)

Users typically provide 9-digit APNs without the trailing zero.

## Common Input Variations

Users and AI agents provide APNs in many formats:

| Input | Digits | Valid? | Normalized |
|-------|--------|--------|------------|
| `003-025-102` | 9 | ✓ | `003-025-102` |
| `003-025-1020` | 10 | ✓ | `003-025-102` |
| `0030251020` | 10 | ✓ | `003-025-102` |
| `003025102` | 9 | ✓ | `003-025-102` |
| `0169-240-080` | 10 | ✓ | `016-924-008` |
| `003.025.102` | 9 | ✓ | `003-025-102` |
| `003 025 102` | 9 | ✓ | `003-025-102` |
| `12345678` | 8 | ✗ | — |
| `12345678901` | 11 | ✗ | — |

## AI Agent Formatting Issue

AI agents frequently misformat 10-digit APNs by placing dashes incorrectly:

```
Correct:   016-924-0080  (3-3-4 grouping)
Incorrect: 0169-240-080  (4-3-3 grouping)
```

Both represent the same parcel (`0169240080`), but the 4-3-3 grouping is technically incorrect per the canonical format. Our parser accepts both.

## Parsing Strategy

SAGE uses **lenient parsing** in `lib/utils/apn.ts`:

1. **Strip all non-digits** - handles dashes, spaces, dots, any separator
2. **Validate digit count** - must be exactly 9 or 10 digits
3. **Parse positionally** - first 3 = book, next 3 = page, remaining = parcel
4. **Normalize to 10 digits** - add trailing `0` if only 9 digits provided

```typescript
import { parseAPN } from '@/lib/utils/apn';

const result = parseAPN('0169-240-080');
// result.formatted = '016-924-008'  (canonical display)
// result.numeric   = '0169240080'   (database query)
// result.mapBook   = '016'
// result.page      = '924'
// result.parcel    = '008'
```

## Why Lenient Parsing?

1. **AI agents** often misformat APNs (4-3-3 instead of 3-3-3)
2. **Users** may copy APNs from various sources with different formatting
3. **Interoperability** - the digit sequence is what matters, not separator placement
4. **Fail-safe** - better to normalize and succeed than reject valid data

## Functions

### `parseAPN(apn: string): ParsedAPN | null`

Full parsing with validation. Returns structured data or `null` if invalid.

Use when you need:
- Formatted display string
- Individual components (book, page, parcel)
- Both display and database formats

### `normalizeApnForQuery(apn: string): string`

Quick normalization for database queries. Strips non-digits and adds trailing zero if needed.

Use when you only need the 10-digit database value and don't need validation feedback.

## Related Files

- `lib/utils/apn.ts` - Core parsing functions
- `lib/utils/apn.test.ts` - Test cases
- `lib/tools/parcel.ts` - Uses parseAPN for parcel lookups
- `lib/tools/definitions/interactive-map.ts` - Uses parseAPN for URL generation
