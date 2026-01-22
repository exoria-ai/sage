'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { WEB_MAPS, getWebMapId } from '@/lib/esri/webmaps';
import { useLayerPairs } from './hooks/useLayerPairs';
import { initializeMapView } from './hooks/useInitialMapView';
import { displayRoute, type RouteStop } from './hooks/useRouteDisplay';
import { addMapWidgets } from './hooks/useMapWidgets';

// Note: Config imports not available client-side, use inline constants
// These values should match lib/config/endpoints.ts and lib/config/defaults.ts
const ESRI_JS_ASSETS = 'https://js.arcgis.com/4.34/@arcgis/core/assets';

// Exclusive group suffix - GroupLayers with this suffix will use radio-button behavior
// (only one child layer visible at a time). Tag is stripped from display name.
const EXCLUSIVE_GROUP_SUFFIX = '[EXCLUSIVE]';

// ESRI imports - these are loaded dynamically client-side only
import esriConfig from '@arcgis/core/config';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

// ESRI CSS - must be imported for proper styling
import '@arcgis/core/assets/esri/themes/light/main.css';
import { MapLoadingSpinner } from './MapLoadingSpinner';

// Configure ESRI assets path - use CDN for reliable asset loading
esriConfig.assetsPath = ESRI_JS_ASSETS;

interface MapContainerProps {
  webMapId?: string;
  preset?: keyof typeof WEB_MAPS;
  className?: string;
  // Feature to highlight on load
  highlightApn?: string;
  highlightAddress?: string;
  // Route display options
  routeOrigin?: RouteStop;
  routeDestination?: RouteStop;
}

export function MapContainer({
  webMapId,
  preset = 'base',
  className = '',
  highlightApn,
  highlightAddress,
  routeOrigin,
  routeDestination,
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);
  const highlightLayerRef = useRef<GraphicsLayer | null>(null);
  const routeLayerRef = useRef<GraphicsLayer | null>(null);
  const identifyButtonRef = useRef<HTMLDivElement | null>(null);
  const identifyModeActiveRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Layer pair management (VectorTileLayer + FeatureLayer optimization)
  const { configureLayerPairs, queryPairedLayersAtPoint } = useLayerPairs();
  const [localError, setLocalError] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [identifyModeActive, setIdentifyModeActive] = useState(false);

  const toggleIdentifyMode = useCallback(() => {
    setIdentifyModeActive((prev) => {
      const newValue = !prev;
      identifyModeActiveRef.current = newValue;
      return newValue;
    });
  }, []);

  // Determine which Web Map ID to use
  const effectiveWebMapId = webMapId || getWebMapId(preset) || '';

  useEffect(() => {
    if (!mapRef.current) return;

    // Don't initialize if no Web Map ID is available
    if (!effectiveWebMapId) {
      setLocalError('No Web Map ID configured. Please provide a webMapId or configure a preset.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const initializeMap = async () => {
      try {
        setIsLoading(true);
        setLocalError(null);

        // Create the Web Map
        const webMap = new WebMap({
          portalItem: {
            id: effectiveWebMapId,
          },
        });

        // Create the Map View
        const view = new MapView({
          container: mapRef.current!,
          map: webMap,
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          ui: {
            components: ['zoom', 'compass', 'attribution'],
          },
          popup: {
            dockEnabled: true,
            dockOptions: {
              buttonEnabled: true,
              breakpoint: false,
              position: 'bottom-right',
            },
            defaultPopupTemplateEnabled: true, // Show attributes even without configured template
          },
        });

        // Wait for the view to be ready
        await view.when();

        if (!isMounted) {
          view.destroy();
          return;
        }

        viewRef.current = view;

        // Progressive layer loading for better perceived performance
        // Priority 1: Basemap and critical boundary layers load first (blocking)
        // Priority 2: Remaining operational layers load in background (non-blocking)
        if (view.map) {
          const allLayers = view.map.allLayers.toArray();

          // Categorize layers by priority
          const isBasemapLayer = (layer: __esri.Layer) => {
            if (layer.type === 'tile') return true;
            if (layer.type === 'vector-tile') {
              const title = layer.title?.toLowerCase() || '';
              return (
                title.includes('basemap') ||
                title.includes('topographic') ||
                title.includes('hillshade') ||
                title.includes('world')
              );
            }
            return false;
          };

          const isCriticalLayer = (layer: __esri.Layer) => {
            const title = layer.title?.toLowerCase() || '';
            return (
              title.includes('county boundary') ||
              title.includes('city boundary') ||
              // Include both Parcels vector tile and feature layer for initial display + queries
              title.includes('parcels')
            );
          };

          const priorityLayers = allLayers.filter(l => isBasemapLayer(l) || isCriticalLayer(l));
          const deferredLayers = allLayers.filter(l => !isBasemapLayer(l) && !isCriticalLayer(l));

          console.log(`Loading ${priorityLayers.length} priority layers first, deferring ${deferredLayers.length} layers`);

          // Load priority layers synchronously (blocks until complete)
          await Promise.all(
            priorityLayers.map(async (layer) => {
              if (layer.load) {
                try {
                  await layer.load();
                } catch (e) {
                  console.warn(`Failed to load priority layer "${layer.title}":`, e);
                }
              }
            })
          );

          // Load deferred layers in background (non-blocking)
          // This allows the map to become interactive while remaining layers load
          const loadDeferredLayers = async () => {
            for (const layer of deferredLayers) {
              if (!isMounted) break;
              if (layer.load) {
                try {
                  await layer.load();
                } catch (e) {
                  console.warn(`Failed to load deferred layer "${layer.title}":`, e);
                }
              }
            }
            if (isMounted) {
              console.log('All deferred layers loaded');
            }
          };

          // Start background loading but don't await it
          if (deferredLayers.length > 0) {
            loadDeferredLayers();
          }

          // Log layer info
          console.log('Priority layers loaded:', priorityLayers.map(l => `${l.title} (${l.type})`));

          // Detect and configure vector tile / feature layer pairs
          // This can run before all layers finish loading since we're just configuring references
          configureLayerPairs(view);

          // Configure exclusive groups - GroupLayers tagged with [EXCLUSIVE] get radio-button behavior
          const groupLayers = allLayers.filter((l) => l.type === 'group') as GroupLayer[];
          for (const groupLayer of groupLayers) {
            if (groupLayer.title?.includes(EXCLUSIVE_GROUP_SUFFIX)) {
              // Set exclusive visibility mode (only one child visible at a time)
              groupLayer.visibilityMode = 'exclusive';
              // Strip the suffix from the display name
              groupLayer.title = groupLayer.title.replace(EXCLUSIVE_GROUP_SUFFIX, '').trim();
              console.log(`Configured exclusive group: "${groupLayer.title}"`);
            }
          }
        }

        // Create highlight graphics layer
        const highlightLayer = new GraphicsLayer({
          id: 'highlight-layer',
          title: 'Highlighted Features',
          listMode: 'hide', // Don't show in layer list
        });
        view.map?.add(highlightLayer);
        highlightLayerRef.current = highlightLayer;

        // Create route graphics layer
        const routeLayer = new GraphicsLayer({
          id: 'route-layer',
          title: 'Route',
          listMode: 'hide',
        });
        view.map?.add(routeLayer);
        routeLayerRef.current = routeLayer;

        // Handle initial view positioning and feature highlighting
        await initializeMapView(view, highlightLayer, {
          apn: highlightApn,
          address: highlightAddress,
        });

        // Display route if origin and destination are provided
        if (routeOrigin && routeDestination) {
          const routeInfo = await displayRoute(view, routeLayer, routeOrigin, routeDestination);
          if (routeInfo) {
            setRouteInfo(routeInfo);
          }
        }

        setIsLoading(false);

        // Add widgets
        addMapWidgets(view, {
          highlightLayerRef,
          identifyButtonRef,
          toggleIdentifyMode,
        });

        // Set up event listeners
        setupEventListeners(view);
      } catch (error) {
        console.error('Failed to initialize map:', error);
        if (isMounted) {
          setLocalError(error instanceof Error ? error.message : 'Failed to load map');
          setIsLoading(false);
        }
      }
    };

    const setupEventListeners = (view: MapView) => {
      // Handle click for feature identification
      // Note: We need to get the current identifyModeActive value via a ref
      // since this callback is created once during initialization
      view.on('click', async (event) => {
        // Only identify when identify mode is active
        if (!identifyModeActiveRef.current) {
          return;
        }

        try {
          // First, try standard hitTest for visible feature layers
          const response = await view.hitTest(event, {
            include: view.map?.allLayers?.filter(
              (l) => l.type === 'feature' || l.type === 'map-image'
            ),
          });

          // Collect all graphics from hitTest
          const allGraphics: __esri.Graphic[] = response.results
            .filter((result) => result.type === 'graphic')
            .map((result) => (result as __esri.GraphicHit).graphic);

          // For paired layers: query the hidden FeatureLayer at click point
          // This handles clicks on VectorTileLayer areas (which hitTest doesn't detect)
          const pairedGraphics = await queryPairedLayersAtPoint(event.mapPoint);

          // Combine hitTest results with paired layer query results
          // Add paired graphics that aren't already in hitTest results
          for (const graphic of pairedGraphics) {
            const layerTitle = graphic.getAttribute('_layerTitle');
            // Check if we already have results from this layer (by title since hidden layer has different id)
            const alreadyHave = allGraphics.some(
              (g) => g.layer?.title === layerTitle || g.getAttribute('_layerTitle') === layerTitle
            );
            if (!alreadyHave) {
              allGraphics.push(graphic);
            }
          }

          if (allGraphics.length > 0) {
            // Open popup with identified features
            view.openPopup({
              location: event.mapPoint,
              features: allGraphics,
            });
          } else {
            view.closePopup();
          }
        } catch (error) {
          console.error('Error during identify:', error);
        }
      });
    };

    initializeMap();

    // Cleanup
    return () => {
      isMounted = false;
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [
    effectiveWebMapId,
    configureLayerPairs,
    queryPairedLayersAtPoint,
    highlightApn,
    highlightAddress,
    routeOrigin,
    routeDestination,
    toggleIdentifyMode,
  ]);

  // Update identify button state and cursor when identify mode changes
  useEffect(() => {
    const button = identifyButtonRef.current;
    const view = viewRef.current;

    // Update button styling
    if (button) {
      if (identifyModeActive) {
        button.classList.add('esri-widget--button-active');
        button.style.backgroundColor = '#0079c1';
        button.style.color = '#ffffff';
        button.setAttribute('title', 'Identify Features (Active - click map to identify)');
      } else {
        button.classList.remove('esri-widget--button-active');
        button.style.backgroundColor = '';
        button.style.color = '';
        button.setAttribute('title', 'Identify Features');
      }
    }

    // Update cursor on map container
    if (view?.container) {
      (view.container as HTMLElement).style.cursor = identifyModeActive ? 'crosshair' : '';
    }
  }, [identifyModeActive]);

  // Show placeholder if no Web Map ID is configured
  if (!effectiveWebMapId) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ minHeight: '400px' }}
      >
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Interactive Map Coming Soon
          </h2>
          <p className="text-gray-500 max-w-md">
            The interactive map is being configured. Once a Web Map ID is
            provided, you&apos;ll be able to explore Solano County parcels,
            zoning, hazards, and more.
          </p>
          <div className="mt-4 p-4 bg-gray-200 rounded-lg text-sm text-gray-600">
            <strong>For developers:</strong> Set a Web Map ID in{' '}
            <code>WEB_MAP_PRESETS</code> or pass <code>webMapId</code> prop.
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (localError) {
    return (
      <div
        className={`flex items-center justify-center bg-red-50 ${className}`}
        style={{ minHeight: '400px' }}
      >
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Map Loading Error
          </h2>
          <p className="text-red-600 max-w-md mb-4">{localError}</p>
          <button
            onClick={() => {
              setLocalError(null);
              setIsLoading(true);
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`} style={{ minHeight: '400px' }}>
      {/* Loading overlay - shows until priority layers are loaded */}
      {isLoading && <MapLoadingSpinner stage="init" variant="overlay" />}

      {/* Route info overlay */}
      {routeInfo && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">End</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex gap-4 text-sm">
              <span className="font-medium text-gray-900">{routeInfo.distance}</span>
              <span className="text-gray-500">{routeInfo.duration}</span>
            </div>
          </div>
        </div>
      )}

      {/* Map container */}
      <div ref={mapRef} className="absolute inset-0" />
    </div>
  );
}
