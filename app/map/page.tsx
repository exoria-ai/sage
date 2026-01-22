'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { WEB_MAPS } from '@/lib/esri/webmaps';
import { MapLoadingSpinner } from '@/app/components/map/MapLoadingSpinner';

// Dynamically import MapContainer to avoid SSR issues with ESRI
const MapContainer = dynamic(
  () => import('@/app/components/map/MapContainer').then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => <MapLoadingSpinner stage="import" />,
  }
);

function MapPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get webMapId from URL params (e.g., /map?id=abc123 or /map?preset=hazards)
  const webMapId = searchParams.get('id') || undefined;
  const preset = (searchParams.get('preset') as keyof typeof WEB_MAPS) || 'parcels';

  // Parse feature highlight parameters
  const highlightApn = searchParams.get('apn') || undefined;
  const highlightAddress = searchParams.get('address') || undefined;

  // Parse route parameters (format: "lng,lat" or "lng,lat,label")
  const originParam = searchParams.get('origin');
  const destinationParam = searchParams.get('destination');

  const parseRouteStop = (param: string | null) => {
    if (!param) return undefined;
    const parts = param.split(',');
    if (parts.length < 2) return undefined;
    const lng = Number(parts[0]);
    const lat = Number(parts[1]);
    const label = parts.length > 2 ? decodeURIComponent(parts.slice(2).join(',')) : undefined;
    return !isNaN(lng) && !isNaN(lat) ? { longitude: lng, latitude: lat, label } : undefined;
  };

  const routeOrigin = parseRouteStop(originParam);
  const routeDestination = parseRouteStop(destinationParam);

  return (
    <div className="flex flex-col h-full min-h-screen">
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
            SAGE
          </h1>
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Interactive Map
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Preset selector */}
          <select
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={preset}
            onChange={(e) => {
              const newPreset = e.target.value;
              const params = new URLSearchParams();
              params.set('preset', newPreset);
              router.push(`/map?${params.toString()}`);
            }}
          >
            <option value="parcels">Parcels</option>
            <option value="planning">Planning</option>
            <option value="hazards">Hazards</option>
          </select>
        </div>
      </header>

      {/* Map */}
      <main className="flex-1 relative min-h-0">
        <MapContainer
          webMapId={webMapId}
          preset={preset}
          className="absolute inset-0"
          highlightApn={highlightApn}
          highlightAddress={highlightAddress}
          routeOrigin={routeOrigin}
          routeDestination={routeDestination}
        />
      </main>

      {/* Footer */}
      <footer className="shrink-0 bg-gray-50 border-t border-gray-200 px-4 py-2 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <span>
            Data sources: Solano County GIS, FEMA, CAL FIRE |
            Map powered by ESRI ArcGIS
          </span>
          <span>
            Part of SAGE - Solano Agent for Geographic Enquiry
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<MapLoadingSpinner stage="suspense" />}>
      <MapPageContent />
    </Suspense>
  );
}
