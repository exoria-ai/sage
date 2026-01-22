/**
 * useLayerPairs Hook Tests
 *
 * Tests for the VectorTileLayer/FeatureLayer pairing constants and types.
 * The hook itself requires @testing-library/react which is not currently installed.
 *
 * Note: Full hook testing could be added by installing @testing-library/react.
 */

import { describe, it, expect } from 'vitest';
import { VECTOR_TILE_SUFFIX } from './useLayerPairs';

describe('useLayerPairs constants', () => {
  describe('VECTOR_TILE_SUFFIX', () => {
    it('exports the correct suffix constant', () => {
      expect(VECTOR_TILE_SUFFIX).toBe('[VECTOR_TILE]');
    });

    it('suffix can be used to detect vector tile layers', () => {
      const layerTitle = 'Parcels [VECTOR_TILE]';
      expect(layerTitle.includes(VECTOR_TILE_SUFFIX)).toBe(true);
    });

    it('suffix can be stripped to get base name', () => {
      const layerTitle = 'Parcels [VECTOR_TILE]';
      const baseName = layerTitle.replace(VECTOR_TILE_SUFFIX, '').trim();
      expect(baseName).toBe('Parcels');
    });

    it('does not match non-vector-tile layers', () => {
      const regularLayer = 'Parcels';
      expect(regularLayer.includes(VECTOR_TILE_SUFFIX)).toBe(false);
    });

    it('handles layers with spaces before suffix', () => {
      const layerTitle = 'City Boundaries [VECTOR_TILE]';
      const baseName = layerTitle.replace(VECTOR_TILE_SUFFIX, '').trim();
      expect(baseName).toBe('City Boundaries');
    });
  });
});
