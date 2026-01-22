import type MapView from '@arcgis/core/views/MapView';
import type GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import Polyline from '@arcgis/core/geometry/Polyline';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

/**
 * Route endpoint with coordinates and optional label
 */
export interface RouteStop {
  latitude: number;
  longitude: number;
  label?: string;
}

/**
 * Route information returned after display
 */
export interface RouteInfo {
  distance: string;
  duration: string;
}

/**
 * Route styling constants
 */
const ROUTE_STYLES = {
  line: {
    color: [0, 100, 255, 0.9] as [number, number, number, number],
    width: 5,
  },
  originMarker: {
    color: [34, 197, 94] as [number, number, number], // Green
    size: 14,
    outlineColor: [255, 255, 255] as [number, number, number],
    outlineWidth: 2,
  },
  destinationMarker: {
    color: [239, 68, 68] as [number, number, number], // Red
    size: 14,
    outlineColor: [255, 255, 255] as [number, number, number],
    outlineWidth: 2,
  },
};

/**
 * Format duration in minutes to human-readable string
 */
function formatDuration(totalMinutes: number): string {
  if (totalMinutes < 60) {
    return `${Math.round(totalMinutes)} min`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const mins = Math.round(totalMinutes % 60);
  return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
}

/**
 * Display a route between two points on the map.
 *
 * Uses the server-side route proxy (/api/arcgis-route) which handles
 * OAuth token management and the required Referer header.
 *
 * @param view - The ESRI MapView instance
 * @param routeLayer - GraphicsLayer to add route graphics to
 * @param origin - Starting point coordinates
 * @param destination - Ending point coordinates
 * @returns Route information (distance and duration) or null if failed
 */
export async function displayRoute(
  view: MapView,
  routeLayer: GraphicsLayer,
  origin: RouteStop,
  destination: RouteStop
): Promise<RouteInfo | null> {
  try {
    console.log('Fetching route from', origin, 'to', destination);

    // Create point objects for display
    const originPoint = new Point({
      longitude: origin.longitude,
      latitude: origin.latitude,
    });

    const destinationPoint = new Point({
      longitude: destination.longitude,
      latitude: destination.latitude,
    });

    // Call server-side route proxy (handles OAuth token and Referer header)
    const routeResponse = await fetch('/api/arcgis-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ origin, destination }),
    });

    const routeData = await routeResponse.json();

    if (routeData.error) {
      console.error('Routing API error:', routeData.error);
      return null;
    }

    // Display the route
    if (routeData.routes?.features?.length > 0) {
      const routeFeature = routeData.routes.features[0];
      const routePaths = routeFeature.geometry.paths;

      // Create polyline from route paths
      const routeGeometry = new Polyline({
        paths: routePaths,
        spatialReference: { wkid: 4326 },
      });

      // Route line symbol
      const routeSymbol = new SimpleLineSymbol({
        color: ROUTE_STYLES.line.color,
        width: ROUTE_STYLES.line.width,
        style: 'solid',
        cap: 'round',
        join: 'round',
      });

      // Add route to map
      const routeGraphic = new Graphic({
        geometry: routeGeometry,
        symbol: routeSymbol,
      });
      routeLayer.add(routeGraphic);

      // Origin marker
      const originSymbol = new SimpleMarkerSymbol({
        color: ROUTE_STYLES.originMarker.color,
        size: ROUTE_STYLES.originMarker.size,
        outline: {
          color: ROUTE_STYLES.originMarker.outlineColor,
          width: ROUTE_STYLES.originMarker.outlineWidth,
        },
      });
      routeLayer.add(
        new Graphic({
          geometry: originPoint,
          symbol: originSymbol,
          attributes: { type: 'origin', label: origin.label || 'Start' },
        })
      );

      // Destination marker
      const destinationSymbol = new SimpleMarkerSymbol({
        color: ROUTE_STYLES.destinationMarker.color,
        size: ROUTE_STYLES.destinationMarker.size,
        outline: {
          color: ROUTE_STYLES.destinationMarker.outlineColor,
          width: ROUTE_STYLES.destinationMarker.outlineWidth,
        },
      });
      routeLayer.add(
        new Graphic({
          geometry: destinationPoint,
          symbol: destinationSymbol,
          attributes: { type: 'destination', label: destination.label || 'End' },
        })
      );

      // Get route info from attributes
      const attrs = routeFeature.attributes;
      const totalMiles =
        attrs?.Total_Miles || attrs?.Total_Length || attrs?.Shape_Length / 1609.34 || 0;
      const totalMinutes = attrs?.Total_TravelTime || attrs?.Total_Time || 0;

      const routeInfo: RouteInfo = {
        distance: `${totalMiles.toFixed(1)} mi`,
        duration: formatDuration(totalMinutes),
      };

      // Zoom to show the entire route
      await view.goTo({
        target: routeGeometry,
        padding: { top: 80, bottom: 50, left: 50, right: 50 },
      });

      console.log('Route displayed:', {
        distance: totalMiles.toFixed(2) + ' miles',
        duration: routeInfo.duration,
      });

      return routeInfo;
    }

    return null;
  } catch (err) {
    console.error('Error displaying route:', err);
    return null;
  }
}
