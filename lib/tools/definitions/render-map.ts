/**
 * Render Map Tool Definition
 *
 * Map rendering with Vercel Blob storage for image URLs.
 */

import { z } from 'zod';
import { put } from '@vercel/blob';
import { defineTool, ToolResponse } from '../types';
import { renderMap } from '../render-map';

export const renderMapTool = defineTool({
  name: 'render_map',
  description: `Generate a static map image for the user to view.

**PURPOSE**: Creates a visual map image. You MUST share the imageUrl with the user.

WORKFLOW (address → map):
1. geocode_address({ address: "675 Texas St, Fairfield, CA" }) → get APN
2. render_map({ apn: "003-025-1020" }) → centers on parcel, highlights it

LOCATION INPUT (provide ONE):
- apn: Assessor's Parcel Number - centers on parcel and highlights it
- center: { latitude, longitude } - centers on point with marker
- apns: Array of APNs - highlights multiple parcels
- buffer: Buffer visualization for notification radius maps
- extent: 'county' - shows entire Solano County

LAYER CONTROL:
Enable/disable layers via the 'layers' option. All layers use map service default symbology.

  render_map({ apn: "003-025-1020", layers: { aerial2025: true } })

Available layers:
- aerial2025: Solano County 2025 high-resolution aerial imagery (default: false)
  **IMPORTANT**: Enable this when zoomed in on parcels - it's clearer and more accurate than
  the generic world imagery basemap, especially when showing parcel boundaries.
- parcels: Parcel boundaries (default: true when zoom >= 14)
- addressPoints: Address point markers (default: false)
- cityBoundary: City boundary outlines (default: false)
- countyBoundary: County boundary outline (default: false)
- garbageAreas: Garbage service areas (default: false)

BASEMAP OPTIONS:
- topographic: (default) Street map with terrain/hillshade
- imagery: ESRI World satellite imagery
- imagery-hybrid: Satellite imagery with road/label overlay
- navigation: Clean navigation-focused street map

BUFFER MODE:
  render_map({ buffer: { apn: "003-025-1020", radius_feet: 300 } })
  → Source parcel highlighted orange, buffer shown as dashed circle
  → Use get_parcels_in_buffer separately if you need owner names for notification lists

COUNTY VIEW:
  render_map({ extent: 'county', layers: { countyBoundary: true, cityBoundary: true } })

OTHER OPTIONS:
- zoom: 1-19 (default: 17, auto-calculated for buffer/extent modes)
- width/height: Image dimensions in pixels (default: 1200x800)

REMEMBER: Always include the imageUrl in your response!`,
  schema: {
    apn: z.string().optional().describe("Assessor's Parcel Number to center map on and highlight"),
    apns: z.array(z.string()).optional().describe('Array of APNs to highlight'),
    center: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }).optional().describe('Center point coordinates (shows marker if no APN)'),
    bbox: z.object({
      xmin: z.number(),
      ymin: z.number(),
      xmax: z.number(),
      ymax: z.number(),
    }).optional().describe('Bounding box in WGS84'),
    buffer: z.object({
      apn: z.string().optional().describe('Source parcel APN for buffer center'),
      latitude: z.number().optional().describe('Source point latitude (if no APN)'),
      longitude: z.number().optional().describe('Source point longitude (if no APN)'),
      radius_feet: z.number().describe('Buffer radius in feet (e.g., 300, 500, 1000)'),
      show_ring: z.boolean().optional().describe('Show buffer circle (default: true)'),
    }).optional().describe('Buffer visualization for notification radius maps'),
    layers: z.object({
      aerial2025: z.boolean().optional().describe('Solano County 2025 high-res aerial - USE THIS when zoomed in on parcels'),
      parcels: z.boolean().optional().describe('Parcel boundaries (default: true at zoom >= 14)'),
      addressPoints: z.boolean().optional().describe('Address point markers'),
      cityBoundary: z.boolean().optional().describe('City boundary outlines'),
      countyBoundary: z.boolean().optional().describe('County boundary outline'),
      garbageAreas: z.boolean().optional().describe('Garbage service areas'),
    }).optional().describe('Layer visibility - all use map service default symbology'),
    extent: z.enum(['county']).optional().describe("'county' to show entire Solano County"),
    basemap: z.enum(['topographic', 'imagery', 'imagery-hybrid', 'navigation']).optional()
      .describe("Base tiles: 'topographic' (default), 'imagery', 'imagery-hybrid', or 'navigation'"),
    zoom: z.number().optional().describe('Zoom level 1-19 (default: 17)'),
    width: z.number().optional().describe('Image width in pixels (default: 1200)'),
    height: z.number().optional().describe('Image height in pixels (default: 800)'),
    format: z.enum(['png', 'jpg']).optional().describe('Image format (default: png)'),
  },
  handler: async ({ apn, apns, center, bbox, buffer, layers, extent, basemap, zoom, width, height, format }): Promise<ToolResponse> => {
    const result = await renderMap({
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

      return {
        content: [
          {
            type: 'image',
            data: result.imageBase64,
            mimeType: result.mimeType,
            annotations: {
              audience: ['user'],
              priority: 1.0,
            },
          },
          {
            type: 'text',
            text: `Map generated successfully.

📍 **IMPORTANT - Share this link with the user:**
${imageUrl}

Center: ${result.center?.latitude}, ${result.center?.longitude}
Dimensions: ${result.width}x${result.height}
Zoom: ${result.zoom}`,
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

/** All render map tools */
export const renderMapTools = [renderMapTool];
