/**
 * Geocode Tool Tests
 *
 * Tests for address geocoding with mocked ArcGIS client.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { geocodeAddress } from './geocode';

// Mock the arcgis service module
vi.mock('@/lib/services/arcgis', () => ({
  solanoClient: {
    queryByAttribute: vi.fn(),
  },
  LAYERS: {
    ADDRESS_POINTS: 'Address_Points/FeatureServer/0',
  },
}));

// Import the mocked module
import { solanoClient } from '@/lib/services/arcgis';

describe('geocodeAddress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('input validation', () => {
    it('returns error for empty address', async () => {
      const result = await geocodeAddress({ address: '' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('INVALID_INPUT');
      expect(result.message).toBe('Address is required');
    });

    it('returns error for whitespace-only address', async () => {
      const result = await geocodeAddress({ address: '   ' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('INVALID_INPUT');
    });
  });

  describe('successful geocoding', () => {
    it('geocodes address with lat/long attributes', async () => {
      vi.mocked(solanoClient.queryByAttribute).mockResolvedValue([
        {
          attributes: {
            fulladdress: '123 MAIN ST FAIRFIELD CA 94533',
            add_number: '123',
            st_name: 'MAIN',
            st_postyp: 'ST',
            apn: '003025102',
            lat: 38.2493,
            long: -122.0398,
            post_comm: 'FAIRFIELD',
            post_code: '94533',
          },
        },
      ]);

      const result = await geocodeAddress({ address: '123 Main St, Fairfield, CA' });

      expect(result.success).toBe(true);
      expect(result.address?.normalized).toBe('123 MAIN ST FAIRFIELD CA 94533');
      expect(result.address?.street).toBe('123 MAIN ST');
      expect(result.address?.city).toBe('FAIRFIELD');
      expect(result.address?.zip).toBe('94533');
      expect(result.location?.latitude).toBe(38.2493);
      expect(result.location?.longitude).toBe(-122.0398);
      expect(result.apn).toBe('003-025-102');
      expect(result.confidence).toBe(1.0);
    });

    it('geocodes address with geometry coordinates', async () => {
      vi.mocked(solanoClient.queryByAttribute).mockResolvedValue([
        {
          attributes: {
            fulladdress: '456 OAK AVE VACAVILLE CA 95688',
            add_number: '456',
            st_name: 'OAK',
            st_postyp: 'AVE',
            apn: '1234567890',
            post_comm: 'VACAVILLE',
            post_code: '95688',
          },
          geometry: {
            x: -121.9877,
            y: 38.3566,
          },
        },
      ]);

      const result = await geocodeAddress({ address: '456 Oak Ave, Vacaville' });

      expect(result.success).toBe(true);
      expect(result.location?.latitude).toBe(38.3566);
      expect(result.location?.longitude).toBe(-121.9877);
      expect(result.apn).toBe('123-456-7890'); // 10-digit APN formatted
    });

    it('returns lower confidence for multiple matches', async () => {
      vi.mocked(solanoClient.queryByAttribute).mockResolvedValue([
        {
          attributes: {
            fulladdress: '100 MAIN ST FAIRFIELD CA 94533',
            add_number: '100',
            st_name: 'MAIN',
            st_postyp: 'ST',
            apn: '003025100',
            lat: 38.2490,
            long: -122.0390,
            post_comm: 'FAIRFIELD',
            post_code: '94533',
          },
        },
        {
          attributes: {
            fulladdress: '100 MAIN ST FAIRFIELD CA 94534',
            add_number: '100',
            st_name: 'MAIN',
            st_postyp: 'ST',
            apn: '003025101',
            lat: 38.2491,
            long: -122.0391,
            post_comm: 'FAIRFIELD',
            post_code: '94534',
          },
        },
      ]);

      const result = await geocodeAddress({ address: '100 Main St, Fairfield' });

      expect(result.success).toBe(true);
      expect(result.confidence).toBe(0.8); // Lower confidence for multiple matches
    });

    it('handles already-formatted APNs', async () => {
      vi.mocked(solanoClient.queryByAttribute).mockResolvedValue([
        {
          attributes: {
            fulladdress: '789 ELM DR BENICIA CA 94510',
            add_number: '789',
            st_name: 'ELM',
            st_postyp: 'DR',
            apn: '005-010-015', // Already formatted
            lat: 38.0493,
            long: -122.1598,
            post_comm: 'BENICIA',
            post_code: '94510',
          },
        },
      ]);

      const result = await geocodeAddress({ address: '789 Elm Dr, Benicia' });

      expect(result.success).toBe(true);
      expect(result.apn).toBe('005-010-015'); // Preserved as-is
    });
  });

  describe('no results', () => {
    it('returns error when no address found', async () => {
      vi.mocked(solanoClient.queryByAttribute).mockResolvedValue([]);

      const result = await geocodeAddress({ address: '99999 Nonexistent Rd, Nowhere' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('NO_RESULTS');
      expect(result.message).toContain('No address found');
    });
  });

  describe('geometry errors', () => {
    it('returns error when coordinates unavailable', async () => {
      vi.mocked(solanoClient.queryByAttribute).mockResolvedValue([
        {
          attributes: {
            fulladdress: '123 MISSING COORDS ST',
            add_number: '123',
            st_name: 'MISSING COORDS',
            st_postyp: 'ST',
            apn: '003025102',
            post_comm: 'FAIRFIELD',
            post_code: '94533',
            // No lat/long attributes
          },
          // No geometry either
        },
      ]);

      const result = await geocodeAddress({ address: '123 Missing Coords St, Fairfield' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('GEOMETRY_ERROR');
      expect(result.message).toContain('coordinates unavailable');
    });
  });

  describe('query errors', () => {
    it('handles API errors gracefully', async () => {
      vi.mocked(solanoClient.queryByAttribute).mockRejectedValue(
        new Error('Network timeout')
      );

      const result = await geocodeAddress({ address: '123 Main St, Fairfield' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('QUERY_ERROR');
      expect(result.message).toContain('Network timeout');
      expect(result.suggestion).toContain('temporarily unavailable');
    });

    it('handles unknown errors', async () => {
      vi.mocked(solanoClient.queryByAttribute).mockRejectedValue('Unknown error type');

      const result = await geocodeAddress({ address: '123 Main St, Fairfield' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('QUERY_ERROR');
      expect(result.message).toContain('Unknown error');
    });
  });

  describe('address parsing', () => {
    it('extracts street number and name from structured address', async () => {
      vi.mocked(solanoClient.queryByAttribute).mockResolvedValue([
        {
          attributes: {
            fulladdress: '500 TEXAS ST FAIRFIELD CA 94533',
            add_number: '500',
            st_name: 'TEXAS',
            st_postyp: 'ST',
            apn: '003025500',
            lat: 38.2500,
            long: -122.0400,
            post_comm: 'FAIRFIELD',
            post_code: '94533',
          },
        },
      ]);

      await geocodeAddress({ address: '500 Texas St, Fairfield' });

      // Check that queryByAttribute was called with structured query
      expect(solanoClient.queryByAttribute).toHaveBeenCalledWith(
        'Address_Points/FeatureServer/0',
        expect.stringContaining('add_number = 500'),
        expect.any(String)
      );
    });
  });
});
