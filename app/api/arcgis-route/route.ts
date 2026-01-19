/**
 * ArcGIS Route Proxy
 *
 * Proxies routing requests to ESRI World Route Service with proper OAuth token
 * and Referer header. This is needed because browser-side fetch cannot set
 * the Referer header, which is required for OAuth token validation.
 */

import { NextResponse } from 'next/server';
import { getArcGISToken } from '@/lib/shared/token-cache';

const ROUTE_SERVICE_URL =
  'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { origin, destination } = body;

    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Missing origin or destination' },
        { status: 400 }
      );
    }

    const token = await getArcGISToken();
    if (!token) {
      return NextResponse.json(
        { error: 'Failed to get ArcGIS token' },
        { status: 500 }
      );
    }

    // Build stops JSON
    const stopsJson = JSON.stringify({
      features: [
        {
          geometry: { x: origin.longitude, y: origin.latitude },
          attributes: { Name: origin.label || 'Origin' },
        },
        {
          geometry: { x: destination.longitude, y: destination.latitude },
          attributes: { Name: destination.label || 'Destination' },
        },
      ],
    });

    // Call routing API with proper Referer header
    const params = new URLSearchParams({
      f: 'json',
      token,
      stops: stopsJson,
      returnDirections: 'true',
      directionsLanguage: 'en',
      outSR: '4326',
    });

    const routeResponse = await fetch(ROUTE_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://sage-three-theta.vercel.app',
      },
      body: params.toString(),
    });

    const routeData = await routeResponse.json();

    if (routeData.error) {
      console.error('Routing API error:', routeData.error);
      return NextResponse.json(
        { error: routeData.error.message || 'Routing failed' },
        { status: 400 }
      );
    }

    return NextResponse.json(routeData);
  } catch (error) {
    console.error('Route proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
