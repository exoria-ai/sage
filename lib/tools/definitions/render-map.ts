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

**PURPOSE**: This tool creates a visual map that the user can see. The entire point is to
produce an image URL that you MUST share with the user.

**CRITICAL - ALWAYS INCLUDE THE URL**:
The tool returns an imageUrl field. You MUST include this URL in your response to the user.
The embedded image may not display in all clients, so the URL is essential.
Format: "Here's the map: [imageUrl]" or include it with your description.

WORKFLOW (address → map):
1. geocode_address({ address: "675 Texas St, Fairfield, CA" }) → get APN
2. render_map({ apn: "003-025-1020" }) → use APN directly (preferred)
   OR render_map({ center: { latitude, longitude }, zoom: 18 })

INPUT (provide ONE):
- apn: Assessor's Parcel Number - PREFERRED. Centers on parcel, highlights boundary.
- center: { latitude, longitude } - Map centered on point with marker.
- buffer: Buffer visualization - for radius/notification maps (see below)
- apns: Array of APNs - display multiple parcels
- bbox: { xmin, ymin, xmax, ymax } - explicit bounding box
- extent: 'county' - Zoom to show the entire county with boundaries

COUNTY MAP MODE - For county-wide visualization:
  render_map({ extent: 'county', boundaries: { showCounty: true, showCities: true } })

  → Shows entire Solano County at appropriate zoom
  → Can overlay county boundary (blue dashed line) and city boundaries (colored, labeled)
  → Parcel boundaries hidden at county zoom (too cluttered)

OPTIONS:
- width/height: Image dimensions (default: 1200x800)
- zoom: Map zoom 1-19 (default: 17). Auto-calculated for buffer mode.
- basemap: 'aerial' (default, recommended) or 'streets'

BUFFER MODE - For radius visualization:
  render_map({ buffer: { apn: "003-025-1020", radius_feet: 300 } })

  → Do NOT call get_parcels_in_buffer first - this tool handles spatial queries internally.
  → Source parcel highlighted in orange, buffer shown as dashed circle.
  → Only use get_parcels_in_buffer if you need owner names/addresses for notification lists.

REMEMBER: Always include the imageUrl in your response!`,
  schema: {
    apn: z.string().optional().describe("Assessor's Parcel Number to center map on"),
    apns: z.array(z.string()).optional().describe('Array of APNs to display (for search results or buffer parcels)'),
    center: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }).optional().describe('Center point coordinates'),
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
      highlight_parcels: z.boolean().optional().describe('Highlight parcels in buffer (default: true)'),
    }).optional().describe('Buffer visualization options'),
    boundaries: z.object({
      showCounty: z.boolean().optional().describe('Show county boundary outline (blue dashed line)'),
      showCities: z.boolean().optional().describe('Show city boundary outlines with labels'),
      countyFill: z.boolean().optional().describe('Fill county with semi-transparent color'),
      cityFill: z.boolean().optional().describe('Fill cities with semi-transparent color'),
    }).optional().describe('County/city boundary visualization options'),
    extent: z.enum(['county']).optional().describe("Zoom to show full extent: 'county' for county-wide view"),
    width: z.number().optional().describe('Image width in pixels (default: 1200)'),
    height: z.number().optional().describe('Image height in pixels (default: 800)'),
    zoom: z.number().optional().describe('Map zoom level 1-19 (auto-calculated for buffer mode)'),
    format: z.enum(['png', 'jpg']).optional().describe('Image format (default: png)'),
    basemap: z.enum(['aerial', 'streets']).optional().describe('Basemap type: aerial (default) or streets'),
  },
  handler: async ({ apn, apns, center, bbox, buffer, boundaries, extent, width, height, zoom, format, basemap }): Promise<ToolResponse> => {
    const result = await renderMap({
      apn,
      apns,
      center,
      bbox,
      buffer,
      boundaries,
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
