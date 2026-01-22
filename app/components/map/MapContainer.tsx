'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { WEB_MAPS, getWebMapId, SOLANO_SERVICES } from '@/lib/esri/webmaps';
import { normalizeApnForQuery } from '@/lib/utils/apn';
import { useLayerPairs } from './hooks/useLayerPairs';
import { initializeMapView } from './hooks/useInitialMapView';
import { displayRoute, type RouteStop } from './hooks/useRouteDisplay';

// Note: Config imports not available client-side, use inline constants
// These values should match lib/config/endpoints.ts and lib/config/defaults.ts
const ESRI_JS_ASSETS = 'https://js.arcgis.com/4.34/@arcgis/core/assets';

// Map styling constants
const MAP_STYLES = {
  highlightOutline: [255, 165, 0] as [number, number, number], // Orange
  highlightOutlineWidth: 3,
};

// Exclusive group suffix - GroupLayers with this suffix will use radio-button behavior
// (only one child layer visible at a time). Tag is stripped from display name.
const EXCLUSIVE_GROUP_SUFFIX = '[EXCLUSIVE]';

// ESRI imports - these are loaded dynamically client-side only
import esriConfig from '@arcgis/core/config';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Expand from '@arcgis/core/widgets/Expand';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import Graphic from '@arcgis/core/Graphic';
import Search from '@arcgis/core/widgets/Search';
import LayerSearchSource from '@arcgis/core/widgets/Search/LayerSearchSource';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import * as query from '@arcgis/core/rest/query';
import Query from '@arcgis/core/rest/support/Query';

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
        addWidgets(view);

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

    const addWidgets = (view: MapView) => {
      // Scale bar
      const scaleBar = new ScaleBar({
        view,
        unit: 'dual', // Shows both metric and non-metric
      });
      view.ui.add(scaleBar, 'bottom-left');

      // Layer List in an expandable panel with visibility toggle and zoom to extent
      const layerList = new LayerList({
        view,
        listItemCreatedFunction: (event) => {
          const item = event.item;

          // Add action buttons for each layer
          item.actionsSections = [
            [
              {
                title: 'Zoom to layer',
                icon: 'zoom-to-object',
                id: 'zoom-to-layer',
              },
              {
                title: 'Increase opacity',
                icon: 'chevron-up',
                id: 'increase-opacity',
              },
              {
                title: 'Decrease opacity',
                icon: 'chevron-down',
                id: 'decrease-opacity',
              },
            ],
          ];

          // Add legend panel to each layer item
          item.panel = {
            content: 'legend',
            open: false,
          };
        },
      });

      // Handle layer list actions
      layerList.on('trigger-action', async (event) => {
        const id = event.action.id;
        const layer = event.item?.layer;

        if (!layer) return;

        if (id === 'zoom-to-layer') {
          // Zoom to layer's full extent
          if ('fullExtent' in layer && layer.fullExtent) {
            view.goTo(layer.fullExtent).catch((err) => {
              console.error('Error zooming to layer:', err);
            });
          } else if ('queryExtent' in layer) {
            // For feature layers, query the extent
            try {
              const result = await (layer as unknown as __esri.FeatureLayer).queryExtent();
              if (result.extent) {
                view.goTo(result.extent);
              }
            } catch (err) {
              console.error('Error querying layer extent:', err);
            }
          }
        } else if (id === 'increase-opacity') {
          if (layer.opacity < 1) {
            layer.opacity = Math.min(1, layer.opacity + 0.25);
          }
        } else if (id === 'decrease-opacity') {
          if (layer.opacity > 0) {
            layer.opacity = Math.max(0, layer.opacity - 0.25);
          }
        }
      });
      const layerListExpand = new Expand({
        view,
        content: layerList,
        expandIcon: 'layers',
        expandTooltip: 'Layers',
        group: 'top-right',
        expanded: true, // Start expanded by default
      });
      view.ui.add(layerListExpand, 'top-right');

      // Legend in an expandable panel
      const legend = new Legend({
        view,
      });
      const legendExpand = new Expand({
        view,
        content: legend,
        expandIcon: 'legend',
        expandTooltip: 'Legend',
        group: 'top-right',
      });
      view.ui.add(legendExpand, 'top-right');

      // Basemap Gallery in an expandable panel
      const basemapGallery = new BasemapGallery({
        view,
      });
      const basemapExpand = new Expand({
        view,
        content: basemapGallery,
        expandIcon: 'basemap',
        expandTooltip: 'Basemaps',
        group: 'top-right',
      });
      view.ui.add(basemapExpand, 'top-right');

      // Search widget with multiple sources (address + parcel)
      // Create parcel search layer
      const parcelSearchLayer = new FeatureLayer({
        url: SOLANO_SERVICES.parcels,
      });

      // Create address search layer
      const addressSearchLayer = new FeatureLayer({
        url: SOLANO_SERVICES.addressPoints,
      });

      const searchWidget = new Search({
        view,
        includeDefaultSources: false, // Don't include ArcGIS World Geocoder
        popupEnabled: true,
        resultGraphicEnabled: true,
        minSuggestCharacters: 2,
        maxSuggestions: 6,
        searchAllEnabled: true, // Allow "All" option to search both sources
        allPlaceholder: 'Search address or APN...',
        sources: [
          new LayerSearchSource({
            // Address search source
            layer: addressSearchLayer,
            searchFields: ['fulladdress', 'st_name'],
            displayField: 'fulladdress',
            exactMatch: false,
            outFields: ['*'],
            name: 'Addresses',
            placeholder: 'Enter address...',
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 3,
          }),
          new LayerSearchSource({
            // Parcel (APN) search source
            layer: parcelSearchLayer,
            searchFields: ['parcelid'],
            displayField: 'parcelid',
            exactMatch: false,
            outFields: ['*'],
            name: 'Parcels (APN)',
            placeholder: 'Enter APN (e.g., 003-025-102)...',
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 4,
            // Custom filter to normalize APN input (strip dashes, add trailing 0 if 9 digits)
            filter: {
              where: '1=1', // Default filter, actual filtering done in getResults
            },
            // Override getResults to normalize APN format before querying
            getResults: (async (params: __esri.GetResultsHandlerParams) => {
              const searchText = String(params.suggestResult?.text || '');
              const normalized = normalizeApnForQuery(searchText);

              // Query with normalized value
              const searchQuery = new Query({
                where: `parcelid LIKE '${normalized}%'`,
                outFields: ['*'],
                returnGeometry: true,
                num: 6,
              });

              try {
                const result = await query.executeQueryJSON(SOLANO_SERVICES.parcels, searchQuery);
                return result.features.map((feature) => ({
                  extent: feature.geometry?.extent,
                  feature: new Graphic({
                    geometry: feature.geometry ?? undefined,
                    attributes: feature.attributes ?? {},
                  }),
                  name: String(feature.attributes?.parcelid || 'Unknown'),
                }));
              } catch {
                return [];
              }
            }) as __esri.GetResultsHandler,
            // Override getSuggestions to normalize APN format for suggestions
            getSuggestions: (async (params: __esri.GetSuggestionsParametersParams) => {
              const searchText = String(params.suggestTerm || '');
              const normalized = normalizeApnForQuery(searchText);

              // Query for suggestions
              const suggestQuery = new Query({
                where: `parcelid LIKE '${normalized}%'`,
                outFields: ['parcelid'],
                returnGeometry: false,
                num: 6,
              });

              try {
                const result = await query.executeQueryJSON(SOLANO_SERVICES.parcels, suggestQuery);
                return result.features.map((feature) => ({
                  text: String(feature.attributes?.parcelid || ''),
                  key: String(feature.attributes?.parcelid || ''),
                }));
              } catch {
                return [];
              }
            }) as __esri.GetSuggestionsParameters,
          }),
        ],
      });

      // Handle search result selection to highlight the feature
      searchWidget.on('select-result', (event) => {
        if (event.result?.feature?.geometry && highlightLayerRef.current) {
          // Clear previous highlights
          highlightLayerRef.current.removeAll();

          // Add new highlight - outline only, no fill to avoid obscuring the parcel
          const highlightGraphic = new Graphic({
            geometry: event.result.feature.geometry,
            symbol: new SimpleFillSymbol({
              color: [0, 0, 0, 0], // Transparent fill
              outline: {
                color: MAP_STYLES.highlightOutline,
                width: MAP_STYLES.highlightOutlineWidth,
              },
            }),
          });
          highlightLayerRef.current.add(highlightGraphic);
        }
      });

      // Clear highlight when search is cleared
      searchWidget.on('search-clear', () => {
        if (highlightLayerRef.current) {
          highlightLayerRef.current.removeAll();
        }
      });

      // Add search widget to manual position (right of zoom/compass/identify)
      // Position it manually to be next to the left-side controls
      view.ui.add(searchWidget, {
        position: 'manual',
      });

      // Style the search widget container for positioning and width
      const searchContainer = searchWidget.container as HTMLElement;
      if (searchContainer) {
        searchContainer.style.position = 'absolute';
        searchContainer.style.top = '15px';
        searchContainer.style.left = '60px'; // Right of the zoom/compass/identify buttons
        searchContainer.style.width = '315px'; // 50% wider than default ~210px
      }

      // Identify button - toggle to enable feature identification on click
      const identifyButton = document.createElement('div');
      identifyButton.id = 'identify-button';
      identifyButton.className = 'esri-widget esri-widget--button esri-interactive';
      identifyButton.setAttribute('role', 'button');
      identifyButton.setAttribute('tabindex', '0');
      identifyButton.setAttribute('title', 'Identify Features');
      identifyButton.innerHTML = `
        <span aria-hidden="true" class="esri-icon esri-icon-description"></span>
        <span class="esri-icon-font-fallback-text">Identify</span>
      `;

      // Store ref for state updates
      identifyButtonRef.current = identifyButton;

      // Click handler for toggle
      identifyButton.addEventListener('click', () => {
        toggleIdentifyMode();
      });

      // Keyboard accessibility
      identifyButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleIdentifyMode();
        }
      });

      view.ui.add(identifyButton, 'top-left');
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
          // Deduplicate by checking if we already have a feature from the same layer
          const hitTestLayerIds = new Set(
            allGraphics.map((g) => g.layer?.id).filter(Boolean)
          );

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
