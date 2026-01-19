/**
 * ArcGIS Token Proxy
 *
 * Provides OAuth access tokens to the browser for ESRI location services.
 * Keeps client_secret secure on the server while allowing client-side
 * access to routing, geocoding, and other premium services.
 *
 * Token is cached and refreshed automatically via shared utility.
 */

import { NextResponse } from 'next/server';
import { getArcGISToken } from '@/lib/shared/token-cache';

export async function GET() {
  try {
    const token = await getArcGISToken();

    if (!token) {
      return NextResponse.json(
        { error: 'ArcGIS credentials not configured or token fetch failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      token,
      // Note: We don't expose exact expiry to client for security
      // The shared cache handles refresh internally
    });
  } catch (error) {
    console.error('Failed to get ArcGIS token:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token from ArcGIS' },
      { status: 500 }
    );
  }
}
