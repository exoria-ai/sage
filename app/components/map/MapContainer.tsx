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

// Track if MapView has been initialized (persists across preset changes)
let globalViewInitialized = false;

interface MapContainerProps {
  webMapId?: string;
  preset?: keyof typeof WEB_MAPS;
  className?: string;
  // Initial view positioning (from URL params)
  center?: { longitude: number; latitude: number };
  zoom?: number;
  // Feature(s) to highlight on load
  highlightApns?: string[];  // Array of APNs to highlight (supports multi-parcel)
  highlightAddress?: string;
  // Route display options
  routeOrigin?: RouteStop;
  routeDestination?: RouteStop;
}

export function MapContainer({
  webMapId,
  preset = 'base',
  className = '',
  center,
  zoom,
  highlightApns,
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

  // Track the previous webMapId to detect changes
  const prevWebMapIdRef = useRef<string | null>(null);

  // Effect 1: Initialize MapView once (on mount)
  useEffect(() => {
    if (!mapRef.current || viewRef.current) return;

    // Don't initialize if no Web Map ID is available
    if (!effectiveWebMapId) {
      setLocalError('No Web Map ID configured. Please provide a webMapId or configure a preset.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const initializeView = async () => {
      try {
        setIsLoading(true);
        setLocalError(null);

        // Create initial Web Map
        const webMap = new WebMap({
          portalItem: {
            id: effectiveWebMapId,
          },
        });

        // Create the Map View (only once)
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
            defaultPopupTemplateEnabled: true,
          },
        });

        await view.when();

        if (!isMounted) {
          view.destroy();
          return;
        }

        viewRef.current = view;
        prevWebMapIdRef.current = effectiveWebMapId;
        globalViewInitialized = true;

        // Create highlight graphics layer (persists across map swaps)
        const highlightLayer = new GraphicsLayer({
          id: 'highlight-layer',
          title: 'Highlighted Features',
          listMode: 'hide',
        });
        highlightLayerRef.current = highlightLayer;

        // Create route graphics layer (persists across map swaps)
        const routeLayer = new GraphicsLayer({
          id: 'route-layer',
          title: 'Route',
          listMode: 'hide',
        });
        routeLayerRef.current = routeLayer;

        // Set up event listeners (only once - they persist across map swaps)
        setupEventListeners(view);

        // Load and configure layers BEFORE adding widgets
        // This ensures layer names are cleaned up before LayerList renders them
        await loadWebMapLayers(view, isMounted);

        // Add widgets AFTER layers are configured (so LayerList shows clean names)
        addMapWidgets(view, {
          highlightLayerRef,
          identifyButtonRef,
          toggleIdentifyMode,
        });

        // Add graphics layers after WebMap layers are configured
        view.map?.add(highlightLayer);
        view.map?.add(routeLayer);

        // Handle initial view positioning and feature highlighting
        console.log('[MapContainer] Calling initializeMapView with:', { highlightApns, highlightAddress, center, zoom });
        await initializeMapView(view, highlightLayer, {
          apns: highlightApns,
          address: highlightAddress,
          center,
          zoom,
        });

        // Display route if origin and destination are provided
        if (routeOrigin && routeDestination) {
          const routeResult = await displayRoute(view, routeLayer, routeOrigin, routeDestination);
          if (routeResult) {
            setRouteInfo(routeResult);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize map:', error);
        if (isMounted) {
          setLocalError(error instanceof Error ? error.message : 'Failed to load map');
          setIsLoading(false);
        }
      }
    };

    const setupEventListeners = (view: MapView) => {
      view.on('click', async (event) => {
        if (!identifyModeActiveRef.current) {
          return;
        }

        try {
          const response = await view.hitTest(event, {
            include: view.map?.allLayers?.filter(
              (l) => l.type === 'feature' || l.type === 'map-image'
            ),
          });

          const allGraphics: __esri.Graphic[] = response.results
            .filter((result) => result.type === 'graphic')
            .map((result) => (result as __esri.GraphicHit).graphic);

          const pairedGraphics = await queryPairedLayersAtPoint(event.mapPoint);

          for (const graphic of pairedGraphics) {
            const layerTitle = graphic.getAttribute('_layerTitle');
            const alreadyHave = allGraphics.some(
              (g) => g.layer?.title === layerTitle || g.getAttribute('_layerTitle') === layerTitle
            );
            if (!alreadyHave) {
              allGraphics.push(graphic);
            }
          }

          if (allGraphics.length > 0) {
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

    const loadWebMapLayers = async (view: MapView, mounted: boolean) => {
      if (!view.map) return;

      const allLayers = view.map.allLayers.toArray();

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
          title.includes('parcels')
        );
      };

      const priorityLayers = allLayers.filter(l => isBasemapLayer(l) || isCriticalLayer(l));
      const deferredLayers = allLayers.filter(l => !isBasemapLayer(l) && !isCriticalLayer(l));

      console.log(`Loading ${priorityLayers.length} priority layers first, deferring ${deferredLayers.length} layers`);

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

      console.log('Priority layers loaded:', priorityLayers.map(l => `${l.title} (${l.type})`));

      // Configure layer pairs and exclusive groups BEFORE deferred loading starts
      // This ensures layer names are cleaned up for the LayerList widget
      // Note: Layer titles are available even before layer.load() completes

      // Configure layer pairs (handles [VECTOR_TILE] tag - renames layers and hides paired FeatureLayers)
      configureLayerPairs(view);

      // Configure exclusive groups (handles [EXCLUSIVE] tag - sets radio-button behavior)
      // Re-fetch layers in case titles changed during pair configuration
      const layersAfterConfig = view.map.allLayers.toArray();
      const groupLayers = layersAfterConfig.filter((l) => l.type === 'group') as GroupLayer[];
      for (const groupLayer of groupLayers) {
        if (groupLayer.title?.includes(EXCLUSIVE_GROUP_SUFFIX)) {
          groupLayer.visibilityMode = 'exclusive';
          groupLayer.title = groupLayer.title.replace(EXCLUSIVE_GROUP_SUFFIX, '').trim();
          console.log(`Configured exclusive group: "${groupLayer.title}"`);
        }
      }

      // Load deferred layers in background (non-blocking) AFTER configuration
      const loadDeferredLayers = async () => {
        for (const layer of deferredLayers) {
          if (!mounted) break;
          if (layer.load) {
            try {
              await layer.load();
            } catch (e) {
              console.warn(`Failed to load deferred layer "${layer.title}":`, e);
            }
          }
        }
        if (mounted) {
          console.log('All deferred layers loaded');
        }
      };

      if (deferredLayers.length > 0) {
        loadDeferredLayers();
      }
    };

    initializeView();

    // Cleanup only on unmount
    return () => {
      isMounted = false;
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
        globalViewInitialized = false;
      }
    };
    // Note: This effect only runs once on mount - effectiveWebMapId is intentionally
    // not in the dependency array. WebMap swapping is handled by the second effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect 2: Swap WebMap when preset changes (without destroying MapView)
  useEffect(() => {
    const view = viewRef.current;
    if (!view || !effectiveWebMapId) return;

    // Skip if this is the initial load (handled by Effect 1)
    if (prevWebMapIdRef.current === null) return;

    // Skip if the webMapId hasn't changed
    if (prevWebMapIdRef.current === effectiveWebMapId) return;

    let isMounted = true;

    const swapWebMap = async () => {
      try {
        setIsLoading(true);
        console.log(`Swapping WebMap: ${prevWebMapIdRef.current} -> ${effectiveWebMapId}`);

        // Save current view state
        const currentCenter = view.center?.clone();
        const currentZoom = view.zoom;

        // Clear graphics layers before swap
        highlightLayerRef.current?.removeAll();
        routeLayerRef.current?.removeAll();
        setRouteInfo(null);

        // Close any open popup
        view.closePopup();

        // Create new WebMap and load it BEFORE assigning to view
        // This allows us to configure layer names before LayerList sees them
        const newWebMap = new WebMap({
          portalItem: {
            id: effectiveWebMapId,
          },
        });

        // Load the WebMap (this populates allLayers with layer metadata)
        await newWebMap.load();

        if (!isMounted) return;

        // Configure layer names on the WebMap BEFORE assigning to view
        // This ensures LayerList sees clean names from the start
        const allLayers = newWebMap.allLayers.toArray();

        // Configure layer pairs (handles [VECTOR_TILE] tag)
        // We need to do this on the WebMap directly, not via configureLayerPairs which expects a view
        const vectorTileLayers = allLayers.filter(
          (l) => l.type === 'vector-tile' && l.title?.includes('[VECTOR_TILE]')
        ) as __esri.VectorTileLayer[];

        for (const vtLayer of vectorTileLayers) {
          const baseName = vtLayer.title!.replace('[VECTOR_TILE]', '').trim();
          const featureLayer = allLayers.find(
            (l) => l.type === 'feature' && l.title === baseName
          ) as __esri.FeatureLayer | undefined;

          if (featureLayer) {
            console.log(`Layer pair detected: "${baseName}" (VectorTile + FeatureLayer)`);
            vtLayer.title = baseName;
            featureLayer.listMode = 'hide';
            featureLayer.opacity = 0;
            vtLayer.watch('visible', (visible) => {
              featureLayer.visible = visible;
            });
            featureLayer.visible = vtLayer.visible;
          }
        }

        // Configure exclusive groups (handles [EXCLUSIVE] tag)
        const groupLayers = allLayers.filter((l) => l.type === 'group') as GroupLayer[];
        for (const groupLayer of groupLayers) {
          if (groupLayer.title?.includes(EXCLUSIVE_GROUP_SUFFIX)) {
            groupLayer.visibilityMode = 'exclusive';
            groupLayer.title = groupLayer.title.replace(EXCLUSIVE_GROUP_SUFFIX, '').trim();
            console.log(`Configured exclusive group: "${groupLayer.title}"`);
          }
        }

        // Now swap the map (LayerList will see clean names)
        view.map = newWebMap;

        // Wait for view to update with new map
        await view.when();

        if (!isMounted) return;

        // Restore view state (zoom/center) - keeps user's current view
        if (currentCenter && currentZoom) {
          view.center = currentCenter;
          view.zoom = currentZoom;
        }

        prevWebMapIdRef.current = effectiveWebMapId;

        // Reconfigure layer pairs in the hook (for query functionality)
        configureLayerPairs(view);

        // Re-add graphics layers to new map
        if (highlightLayerRef.current) {
          view.map.add(highlightLayerRef.current);
        }
        if (routeLayerRef.current) {
          view.map.add(routeLayerRef.current);
        }

        // Load layers in background for better performance
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
            title.includes('parcels')
          );
        };

        const priorityLayers = allLayers.filter(l => isBasemapLayer(l) || isCriticalLayer(l));
        const deferredLayers = allLayers.filter(l => !isBasemapLayer(l) && !isCriticalLayer(l));

        // Load priority layers
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

        // Load deferred layers in background
        if (deferredLayers.length > 0) {
          (async () => {
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
            if (isMounted) console.log('All deferred layers loaded');
          })();
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to swap WebMap:', error);
        if (isMounted) {
          setLocalError(error instanceof Error ? error.message : 'Failed to switch map');
          setIsLoading(false);
        }
      }
    };

    swapWebMap();

    return () => {
      isMounted = false;
    };
  }, [effectiveWebMapId, configureLayerPairs]);

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
