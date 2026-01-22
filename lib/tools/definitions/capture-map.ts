/**
 * Capture Map View Tool Definition
 *
 * Generates map snapshots for AI spatial analysis.
 * For user-facing interactive maps, use get_interactive_map_url instead.
 */

import { z } from 'zod';
import { put } from '@vercel/blob';
import { defineTool, ToolResponse } from '../types';
import { captureMapView } from '../capture-map';

export const captureMapViewTool = defineTool({
  name: 'capture_map_view',
  description: `Capture a map snapshot for spatial analysis.

**PURPOSE**: Generates a map image for YOU (the AI) to visually analyze spatial relationships,
verify locations, and understand geographic context. The image is returned directly to you.

For USER-FACING interactive maps where they can pan/zoom/explore, use get_interactive_map_url instead.

**WHEN TO USE THIS TOOL**:
- You need to visually verify a location or parcel
- You're assessing spatial relationships ("is this near the freeway?")
- You want to see the layout of parcels in a buffer/notification area
- You need to confirm what layers/features are present in an area
- You're making a spatial decision that requires visual context

**WHAT YOU GET BACK**:
- The map image (displayed to you for analysis)
- Spatial context metadata:
  - extent: Bounding box coordinates
  - scale: Approximate map scale (e.g., "1:5K")
  - layersShown: List of visible layers
  - highlightedApns: APNs highlighted on map
  - approximateArea: Area shown (e.g., "~25 acres")

**LOCATION INPUT** (provide ONE):
- apn: Centers on and highlights a parcel
- center: { latitude, longitude } - Centers on a point
- apns: Array of APNs to highlight
- buffer: Buffer visualization for notification maps
- extent: 'county' for full Solano County view

**EXAMPLES**:

Verify a parcel location:
  capture_map_view({ apn: "003-025-1020" })

See parcels in a notification buffer:
  capture_map_view({ buffer: { apn: "003-025-1020", radius_feet: 300 } })

Check flood zones for a property:
  capture_map_view({
    apn: "003-025-1020",
    additionalLayers: [
      { url: "https://hazards.fema.gov/.../NFHL/MapServer/28", title: "Flood Zones" }
    ]
  })

View with aerial imagery for detail:
  capture_map_view({ apn: "003-025-1020", layers: { aerial2025: true } })

**AVAILABLE LAYERS**:
- parcels: Parcel boundaries WITH APN LABELS (default: true at zoom >= 14)
- aerial2025: Solano County 2025 high-res aerial - great for parcel detail
- addressPoints: Address point markers
- cityBoundary: City boundary outlines
- countyBoundary: County boundary outline
- garbageAreas: Garbage service areas

**BASEMAPS**: topographic (default), imagery, imagery-hybrid, navigation

**NOTE**: An imageUrl is also generated for sharing with the user if needed.`,
  schema: {
    apn: z.string().optional().describe("APN to center on and highlight"),
    apns: z.array(z.string()).optional().describe('Multiple APNs to highlight'),
    center: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }).optional().describe('Center point (shows marker if no APN)'),
    bbox: z.object({
      xmin: z.number(),
      ymin: z.number(),
      xmax: z.number(),
      ymax: z.number(),
    }).optional().describe('Bounding box in WGS84'),
    buffer: z.object({
      apn: z.string().optional().describe('Source parcel APN'),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      radius_feet: z.number().describe('Buffer radius in feet'),
      show_ring: z.boolean().optional().describe('Show buffer circle (default: true)'),
    }).optional().describe('Buffer visualization'),
    layers: z.object({
      aerial2025: z.boolean().optional().describe('2025 high-res aerial imagery'),
      parcels: z.boolean().optional().describe('Parcels with APN labels (default: true at zoom >= 14)'),
      addressPoints: z.boolean().optional(),
      cityBoundary: z.boolean().optional(),
      countyBoundary: z.boolean().optional(),
      garbageAreas: z.boolean().optional(),
    }).optional().describe('Layer visibility'),
    extent: z.enum(['county']).optional().describe("'county' for full Solano County"),
    basemap: z.enum(['topographic', 'imagery', 'imagery-hybrid', 'navigation']).optional(),
    zoom: z.number().optional().describe('Zoom 1-19 (default: 17)'),
    width: z.number().optional().describe('Width in pixels (default: 1200)'),
    height: z.number().optional().describe('Height in pixels (default: 800)'),
    format: z.enum(['png', 'jpg']).optional(),
    additionalLayers: z.array(z.object({
      url: z.string().describe('Map service URL'),
      title: z.string().optional(),
      opacity: z.number().min(0).max(1).optional(),
      layerType: z.enum(['ArcGISTiledMapServiceLayer', 'ArcGISMapServiceLayer', 'ArcGISFeatureLayer']).optional(),
      where: z.string().optional().describe('Filter expression'),
    })).optional().describe('Additional overlay layers'),
    extentLayer: z.object({
      url: z.string(),
      where: z.string().optional(),
      padding: z.number().min(0).max(1).optional(),
    }).optional().describe("Use a layer's extent as map extent"),
    layout: z.enum(['MAP_ONLY', 'Letter ANSI A Landscape', 'A4 Landscape']).optional()
      .describe("Layout template: 'MAP_ONLY' (default) or template with scale bar/title"),
    layoutOptions: z.object({
      title: z.string().optional().describe('Title text for the map'),
      author: z.string().optional().describe('Author attribution'),
      scalebarUnit: z.enum(['Feet', 'Miles', 'Meters', 'Kilometers']).optional()
        .describe('Scale bar unit'),
    }).optional().describe('Options for layout templates (only used with non-MAP_ONLY layouts)'),
  },
  handler: async ({ apn, apns, center, bbox, buffer, layers, extent, basemap, zoom, width, height, format, additionalLayers, extentLayer, layout, layoutOptions }): Promise<ToolResponse> => {
    const result = await captureMapView({
      apn,
      apns,
      center,
      bbox,
      buffer,
      layers,
      extent,
      width,
      height,
      zoom,
      format,
      basemap,
      additionalLayers,
      extentLayer,
      layout,
      layoutOptions,
    });

    // If successful, upload to Vercel Blob and return URL
    if (result.success && result.imageBase64 && result.mimeType) {
      // Generate a unique filename
      const ext = format || 'png';
      const timestamp = Date.now();
      const identifier = apn || apns?.[0] || buffer?.apn || extent || `${center?.latitude}_${center?.longitude}` || 'map';
      const filename = `maps/${identifier.replace(/[^a-zA-Z0-9-_]/g, '-')}_${timestamp}.${ext}`;

      // Convert base64 to buffer and upload
      const imageBuffer = Buffer.from(result.imageBase64, 'base64');

      let imageUrl: string;
      try {
        const blob = await put(filename, imageBuffer, {
          access: 'public',
          contentType: result.mimeType,
        });
        imageUrl = blob.url;
      } catch (uploadError) {
        // If blob upload fails, fall back to the dynamic API route
        console.error('Blob upload failed:', uploadError);
        const baseUrl = process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'https://sage-three-theta.vercel.app';
        const params = new URLSearchParams();
        if (apn) params.set('apn', apn);
        if (center) {
          params.set('lat', center.latitude.toString());
          params.set('lng', center.longitude.toString());
        }
        if (zoom) params.set('zoom', zoom.toString());
        imageUrl = `${baseUrl}/api/map?${params.toString()}`;
      }

      // Build spatial context summary for AI
      const ctx = result.context;
      const contextSummary = ctx ? `
**Spatial Context:**
- Scale: ${ctx.scale}
- Area shown: ${ctx.approximateArea}
- Layers: ${ctx.layersShown.join(', ')}
- Extent: [${ctx.extent.xmin.toFixed(4)}, ${ctx.extent.ymin.toFixed(4)}] to [${ctx.extent.xmax.toFixed(4)}, ${ctx.extent.ymax.toFixed(4)}]
${ctx.highlightedApns ? `- Highlighted APNs: ${ctx.highlightedApns.join(', ')}` : ''}
${ctx.buffer ? `- Buffer: ${ctx.buffer.radiusFeet} ft radius${ctx.buffer.centerApn ? ` from ${ctx.buffer.centerApn}` : ''}` : ''}
${ctx.hasScaleBar ? `- Layout: ${ctx.layout} (includes scale bar)` : ''}` : '';

      return {
        content: [
          {
            type: 'image',
            data: result.imageBase64,
            mimeType: result.mimeType,
          },
          {
            type: 'text',
            text: `Map captured successfully.
${contextSummary}

**For user sharing:** ${imageUrl}

Center: ${result.center?.latitude.toFixed(6)}, ${result.center?.longitude.toFixed(6)}
Dimensions: ${result.width}x${result.height} | Zoom: ${result.zoom}`,
          },
        ],
      };
    }

    // Error case
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
});

/** All map capture tools */
export const captureMapTools = [captureMapViewTool];
