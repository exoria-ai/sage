/**
 * Map Image API Route
 *
 * Generates static map images on-demand via URL parameters.
 * Returns PNG/JPG images directly for easy embedding and sharing.
 *
 * Usage:
 *   /api/map?apn=0030-251-020
 *   /api/map?lat=38.248&lng=-122.041&zoom=17
 *   /api/map?apns=0030-251-020,0030-251-021&zoom=15
 */

import { NextRequest, NextResponse } from 'next/server';
import { captureMapView } from '@/lib/tools/capture-map';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Parse parameters
  const apn = searchParams.get('apn') || undefined;
  const apnsParam = searchParams.get('apns');
  const apns = apnsParam ? apnsParam.split(',').map(a => a.trim()) : undefined;

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const center = lat && lng ? {
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
  } : undefined;

  const xmin = searchParams.get('xmin');
  const ymin = searchParams.get('ymin');
  const xmax = searchParams.get('xmax');
  const ymax = searchParams.get('ymax');
  const bbox = (xmin && ymin && xmax && ymax) ? {
    xmin: parseFloat(xmin),
    ymin: parseFloat(ymin),
    xmax: parseFloat(xmax),
    ymax: parseFloat(ymax),
  } : undefined;

  const width = searchParams.get('width') ? parseInt(searchParams.get('width')!) : undefined;
  const height = searchParams.get('height') ? parseInt(searchParams.get('height')!) : undefined;
  const zoom = searchParams.get('zoom') ? parseInt(searchParams.get('zoom')!) : undefined;
  const format = (searchParams.get('format') as 'png' | 'jpg') || undefined;
  const basemap = (searchParams.get('basemap') as 'topographic' | 'imagery' | 'imagery-hybrid' | 'navigation') || undefined;

  // Validate - need at least one location parameter
  if (!apn && !apns && !center && !bbox) {
    return NextResponse.json(
      { error: 'Must provide apn, apns, lat/lng, or bbox parameters' },
      { status: 400 }
    );
  }

  try {
    const result = await captureMapView({
      apn,
      apns,
      center,
      bbox,
      width,
      height,
      zoom,
      format,
      basemap,
    });

    if (!result.success || !result.imageBase64 || !result.mimeType) {
      return NextResponse.json(
        { error: result.message || 'Failed to generate map' },
        { status: 500 }
      );
    }

    // Convert base64 to buffer and return as image
    const imageBuffer = Buffer.from(result.imageBase64, 'base64');

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': result.mimeType,
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Map generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
