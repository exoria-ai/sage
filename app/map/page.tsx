'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { WEB_MAPS } from '@/lib/esri/webmaps';

// Dynamically import MapContainer to avoid SSR issues with ESRI
const MapContainer = dynamic(
  () => import('@/app/components/map/MapContainer'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SAGE Interactive Map...</p>
        </div>
      </div>
    ),
  }
);

function MapPageContent() {
  const searchParams = useSearchParams();

  // Get webMapId from URL params (e.g., /map?id=abc123 or /map?preset=hazards)
  const webMapId = searchParams.get('id') || undefined;
  const preset = (searchParams.get('preset') as keyof typeof WEB_MAPS) || 'base';

  return (
    <div className="flex flex-col h-full min-h-screen">
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
            SAGE Interactive Map
          </h1>
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Solano County GIS Explorer
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Preset selector */}
          <select
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={preset}
            onChange={(e) => {
              const newPreset = e.target.value;
              const url = new URL(window.location.href);
              url.searchParams.set('preset', newPreset);
              url.searchParams.delete('id');
              window.location.href = url.toString();
            }}
          >
            <option value="base">Property Research</option>
            <option value="hazards">Hazard Assessment</option>
            <option value="zoning">Zoning Analysis</option>
            <option value="environmental">Environmental Review</option>
            <option value="districts">District Lookup</option>
          </select>
        </div>
      </header>

      {/* Map */}
      <main className="flex-1 relative min-h-0">
        <MapContainer
          webMapId={webMapId}
          preset={preset}
          className="absolute inset-0"
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
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <MapPageContent />
    </Suspense>
  );
}
