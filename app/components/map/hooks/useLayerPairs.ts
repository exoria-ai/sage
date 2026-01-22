import { useRef, useCallback } from 'react';
import type MapView from '@arcgis/core/views/MapView';
import Query from '@arcgis/core/rest/support/Query';

/**
 * Suffix used to identify VectorTileLayer/FeatureLayer pairs.
 * Layers named "X [VECTOR_TILE]" are paired with "X" FeatureLayers.
 * The VectorTileLayer handles display, the FeatureLayer handles queries/identify.
 */
export const VECTOR_TILE_SUFFIX = '[VECTOR_TILE]';

/**
 * Represents a paired layer configuration where a VectorTileLayer handles
 * display and a FeatureLayer handles queries/identify operations.
 */
export interface LayerPair {
  baseName: string;
  vectorTileLayer: __esri.VectorTileLayer;
  featureLayer: __esri.FeatureLayer;
}

/**
 * Result from querying paired layers at a point.
 */
export interface PairedLayerQueryResult {
  baseName: string;
  features: __esri.Graphic[];
}

interface UseLayerPairsReturn {
  /** Ref to access current layer pairs */
  layerPairsRef: React.MutableRefObject<LayerPair[]>;

  /** Detect and configure layer pairs from a MapView */
  configureLayerPairs: (view: MapView) => LayerPair[];

  /** Query all visible paired layers at a map point */
  queryPairedLayersAtPoint: (
    mapPoint: __esri.Point,
    options?: { includeHidden?: boolean }
  ) => Promise<__esri.Graphic[]>;

  /** Get the paired FeatureLayer for a given layer title */
  getPairedFeatureLayer: (layerTitle: string) => __esri.FeatureLayer | undefined;
}

/**
 * Hook for managing VectorTileLayer/FeatureLayer pairs.
 *
 * This pattern is used for performance optimization:
 * - VectorTileLayers render much faster than FeatureLayers
 * - FeatureLayers support queries and identify operations
 * - By pairing them, we get fast rendering AND query capability
 *
 * Layer naming convention:
 * - "Parcels [VECTOR_TILE]" (VectorTileLayer) + "Parcels" (FeatureLayer)
 * - The suffix is stripped from display name after configuration
 *
 * @example
 * ```tsx
 * const { layerPairsRef, configureLayerPairs, queryPairedLayersAtPoint } = useLayerPairs();
 *
 * // During map initialization
 * useEffect(() => {
 *   const pairs = configureLayerPairs(view);
 *   console.log(`Configured ${pairs.length} layer pairs`);
 * }, [view]);
 *
 * // During identify click
 * const handleClick = async (event) => {
 *   const graphics = await queryPairedLayersAtPoint(event.mapPoint);
 *   // graphics have _layerTitle attribute set to the base name
 * };
 * ```
 */
export function useLayerPairs(): UseLayerPairsReturn {
  const layerPairsRef = useRef<LayerPair[]>([]);

  /**
   * Detect and configure VectorTileLayer/FeatureLayer pairs from the map.
   *
   * For each pair:
   * 1. Renames the VectorTileLayer to the base name (removes suffix)
   * 2. Hides the FeatureLayer from the layer list (listMode='hide')
   * 3. Sets FeatureLayer opacity to 0 (invisible but queryable)
   * 4. Syncs visibility between the pair
   */
  const configureLayerPairs = useCallback((view: MapView): LayerPair[] => {
    if (!view.map?.allLayers) {
      console.warn('configureLayerPairs: No layers available');
      return [];
    }

    const allLayers = view.map.allLayers.toArray();
    const layerPairs: LayerPair[] = [];

    // Find all vector tile layers with the suffix
    const vectorTileLayers = allLayers.filter(
      (l) => l.type === 'vector-tile' && l.title?.includes(VECTOR_TILE_SUFFIX)
    ) as __esri.VectorTileLayer[];

    for (const vtLayer of vectorTileLayers) {
      // Extract base name (remove suffix and trim)
      const baseName = vtLayer.title!.replace(VECTOR_TILE_SUFFIX, '').trim();

      // Find matching feature layer with same base name
      const featureLayer = allLayers.find(
        (l) => l.type === 'feature' && l.title === baseName
      ) as __esri.FeatureLayer | undefined;

      if (featureLayer) {
        console.log(`Layer pair detected: "${baseName}" (VectorTile + FeatureLayer)`);

        // Configure the pair:
        // 1. Vector tile layer handles display - rename it to base name for clean UI
        vtLayer.title = baseName;

        // 2. Feature layer is hidden from display but kept for queries
        //    - Set listMode to 'hide' so it doesn't appear in LayerList
        //    - Set opacity to 0 so it doesn't render, but stays "visible" for queries
        featureLayer.listMode = 'hide';
        featureLayer.opacity = 0;

        // 3. Sync visibility: when vector tile visibility changes, update feature layer
        vtLayer.watch('visible', (visible) => {
          featureLayer.visible = visible;
        });

        // Initial sync
        featureLayer.visible = vtLayer.visible;

        layerPairs.push({
          baseName,
          vectorTileLayer: vtLayer,
          featureLayer,
        });
      } else {
        console.warn(`No matching FeatureLayer found for "${vtLayer.title}"`);
      }
    }

    layerPairsRef.current = layerPairs;
    console.log(`Configured ${layerPairs.length} layer pair(s)`);

    return layerPairs;
  }, []);

  /**
   * Query all visible paired layers at a given map point.
   *
   * This is used during identify operations to find features under
   * VectorTileLayers (which don't support hitTest directly).
   *
   * @param mapPoint - The point to query at
   * @param options.includeHidden - If true, also query hidden layers (default: false)
   * @returns Graphics with _layerTitle attribute set to the base name
   */
  const queryPairedLayersAtPoint = useCallback(
    async (
      mapPoint: __esri.Point,
      options: { includeHidden?: boolean } = {}
    ): Promise<__esri.Graphic[]> => {
      const { includeHidden = false } = options;

      const queries = layerPairsRef.current
        .filter((pair) => includeHidden || pair.vectorTileLayer.visible)
        .map(async (pair): Promise<__esri.Graphic[]> => {
          try {
            const spatialQuery = new Query({
              geometry: mapPoint,
              spatialRelationship: 'intersects',
              outFields: ['*'],
              returnGeometry: true,
            });

            const result = await pair.featureLayer.queryFeatures(spatialQuery);

            if (result.features && result.features.length > 0) {
              // Return features with the display name (not the hidden layer name)
              return result.features.map((f) => {
                const graphic = f.clone();
                // Store the base name for popup title
                graphic.setAttribute('_layerTitle', pair.baseName);
                return graphic;
              });
            }
            return [];
          } catch (err) {
            console.error(`Error querying paired layer "${pair.baseName}":`, err);
            return [];
          }
        });

      const results = await Promise.all(queries);
      return results.flat();
    },
    []
  );

  /**
   * Get the paired FeatureLayer for a given layer title.
   * Useful when you need to run custom queries against a layer.
   */
  const getPairedFeatureLayer = useCallback(
    (layerTitle: string): __esri.FeatureLayer | undefined => {
      const pair = layerPairsRef.current.find((p) => p.baseName === layerTitle);
      return pair?.featureLayer;
    },
    []
  );

  return {
    layerPairsRef,
    configureLayerPairs,
    queryPairedLayersAtPoint,
    getPairedFeatureLayer,
  };
}
