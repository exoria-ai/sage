import type MapView from '@arcgis/core/views/MapView';
import type GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import type Geometry from '@arcgis/core/geometry/Geometry';
import type Polygon from '@arcgis/core/geometry/Polygon';
import Graphic from '@arcgis/core/Graphic';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import * as query from '@arcgis/core/rest/query';
import Query from '@arcgis/core/rest/support/Query';
import Extent from '@arcgis/core/geometry/Extent';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';

import { SOLANO_SERVICES } from '@/lib/esri/webmaps';
import { normalizeApnForQuery } from '@/lib/utils/apn';

/**
 * Default zoom level when highlighting a single parcel or address
 */
const HIGHLIGHT_ZOOM = 18;

/**
 * Solano County extent (WGS84) - used for consistent initial map view
 */
const SOLANO_COUNTY_EXTENT = {
  xmin: -122.409,
  ymin: 38.031,
  xmax: -121.592,
  ymax: 38.538,
};

/**
 * Highlight symbol for parcels - orange outline, transparent fill
 */
const HIGHLIGHT_SYMBOL = new SimpleFillSymbol({
  color: [0, 0, 0, 0],
  outline: {
    color: [255, 165, 0],
    width: 3,
  },
});

export interface InitialMapViewOptions {
  /** APNs to highlight and zoom to (supports multiple) */
  apns?: string[];
  /** Address to geocode and highlight */
  address?: string;
  /** Initial center point (from URL params) */
  center?: { longitude: number; latitude: number };
  /** Initial zoom level (from URL params) */
  zoom?: number;
}

/**
 * Handle initial view positioning and feature highlighting.
 *
 * Priority order:
 * 1. APNs - Query parcels by APN(s) and zoom to combined extent
 * 2. Address - Geocode address, find associated parcel, and highlight
 * 3. Default - Fit Solano County extent in view
 *
 * @param view - The ESRI MapView instance
 * @param highlightLayer - GraphicsLayer to add highlight graphics to
 * @param options - APNs or address to highlight
 */
export async function initializeMapView(
  view: MapView,
  highlightLayer: GraphicsLayer,
  options: InitialMapViewOptions
): Promise<void> {
  const { apns, address, center, zoom } = options;

  console.log('[initializeMapView] Options received:', { apns, address, center, zoom });

  if (apns && apns.length > 0) {
    console.log('[initializeMapView] Branch: APNs');
    await highlightByApns(view, highlightLayer, apns);
  } else if (address) {
    console.log('[initializeMapView] Branch: Address');
    await highlightByAddress(view, highlightLayer, address);
  } else if (center) {
    console.log('[initializeMapView] Branch: Center/Zoom');
    await zoomToCenter(view, center, zoom);
  } else {
    console.log('[initializeMapView] Branch: Default county extent');
    await zoomToCountyExtent(view);
  }
}

/**
 * Query multiple parcels by APNs and highlight them all
 */
async function highlightByApns(
  view: MapView,
  highlightLayer: GraphicsLayer,
  apns: string[]
): Promise<void> {
  try {
    console.log('Querying parcels by APNs:', apns);

    // Normalize all APNs for query
    const normalizedApns = apns.map(apn => normalizeApnForQuery(apn));

    // Build WHERE clause for multiple APNs
    const whereClause = normalizedApns.length === 1
      ? `parcelid = '${normalizedApns[0]}'`
      : `parcelid IN (${normalizedApns.map(a => `'${a}'`).join(', ')})`;

    const queryTask = new Query({
      where: whereClause,
      outFields: ['*'],
      returnGeometry: true,
    });

    const result = await query.executeQueryJSON(SOLANO_SERVICES.parcels, queryTask);

    if (result.features && result.features.length > 0) {
      const geometries: Geometry[] = [];

      // Add highlight graphic for each parcel
      for (const feature of result.features) {
        const graphic = new Graphic({
          geometry: feature.geometry ?? undefined,
          symbol: HIGHLIGHT_SYMBOL,
          attributes: feature.attributes ?? {},
        });
        highlightLayer.add(graphic);

        if (feature.geometry) {
          geometries.push(feature.geometry);
        }
      }

      console.log(`Highlighted ${result.features.length} parcel(s)`);

      // Zoom to combined extent of all parcels
      if (geometries.length > 0) {
        if (geometries.length === 1) {
          // Single parcel - zoom to it with standard zoom
          await view.goTo({
            target: geometries[0],
            zoom: HIGHLIGHT_ZOOM,
          });
        } else {
          // Multiple parcels - calculate union extent and fit all
          // Cast to Polygon[] since parcels are always polygons
          const unionGeometry = geometryEngine.union(geometries as Polygon[]);
          if (unionGeometry) {
            await view.goTo({
              target: unionGeometry,
            });
            // Add some padding by zooming out slightly
            if (view.zoom > 15) {
              await view.goTo({ zoom: view.zoom - 1 });
            }
          }
        }
      }
    } else {
      console.warn('No parcels found for APNs:', apns);
    }
  } catch (err) {
    console.error('Error querying parcels by APNs:', err);
  }
}

/**
 * Geocode address, find associated parcel, and highlight it
 */
async function highlightByAddress(
  view: MapView,
  highlightLayer: GraphicsLayer,
  address: string
): Promise<void> {
  try {
    console.log('Geocoding address:', address);
    const queryTask = new Query({
      where: `UPPER(fulladdress) LIKE UPPER('%${address.replace(/'/g, "''")}%')`,
      outFields: ['*'],
      returnGeometry: true,
      num: 1,
    });

    const result = await query.executeQueryJSON(SOLANO_SERVICES.addressPoints, queryTask);

    if (result.features && result.features.length > 0) {
      const feature = result.features[0]!;
      const attrs = feature.attributes ?? {};
      const apn = attrs.APN || attrs.apn;

      // If we got an APN from the address, query the parcel to highlight it
      if (apn) {
        const normalizedApn = normalizeApnForQuery(String(apn));
        const parcelQuery = new Query({
          where: `parcelid = '${normalizedApn}'`,
          outFields: ['*'],
          returnGeometry: true,
        });

        const parcelResult = await query.executeQueryJSON(SOLANO_SERVICES.parcels, parcelQuery);

        if (parcelResult.features && parcelResult.features.length > 0) {
          const parcelFeature = parcelResult.features[0]!;
          const graphic = new Graphic({
            geometry: parcelFeature.geometry ?? undefined,
            symbol: HIGHLIGHT_SYMBOL,
            attributes: parcelFeature.attributes ?? {},
          });
          highlightLayer.add(graphic);

          if (parcelFeature.geometry) {
            await view.goTo({
              target: parcelFeature.geometry,
              zoom: HIGHLIGHT_ZOOM,
            });
          }
          console.log('Highlighted parcel for address:', attrs);
          return;
        }
      }

      // Fallback: just zoom to the address point
      if (feature.geometry) {
        await view.goTo({
          target: feature.geometry,
          zoom: HIGHLIGHT_ZOOM,
        });
      }
      console.log('Found address:', attrs);
    } else {
      console.warn('No address found for:', address);
    }
  } catch (err) {
    console.error('Error geocoding address:', err);
  }
}

/**
 * Zoom to a specific center point with optional zoom level
 */
async function zoomToCenter(
  view: MapView,
  center: { longitude: number; latitude: number },
  zoom?: number
): Promise<void> {
  const effectiveZoom = zoom ?? 12; // Default to zoom 12 if not specified
  console.log(`Setting view to center: ${center.longitude}, ${center.latitude} at zoom ${effectiveZoom}`);
  await view.goTo({
    center: [center.longitude, center.latitude],
    zoom: effectiveZoom,
  });
  console.log('Finished setting custom center/zoom');
}

/**
 * Zoom to the Solano County extent
 */
async function zoomToCountyExtent(view: MapView): Promise<void> {
  console.log('Setting default Solano County extent');
  const countyExtent = new Extent({
    xmin: SOLANO_COUNTY_EXTENT.xmin,
    ymin: SOLANO_COUNTY_EXTENT.ymin,
    xmax: SOLANO_COUNTY_EXTENT.xmax,
    ymax: SOLANO_COUNTY_EXTENT.ymax,
    spatialReference: { wkid: 4326 },
  });
  await view.goTo(countyExtent);
  console.log('Finished setting Solano County extent');
}
