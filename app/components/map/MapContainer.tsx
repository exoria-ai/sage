'use client';

import { useEffect, useRef, useState } from 'react';
import {
  useMapStore,
  type MapViewState,
  type LayerInfo,
} from '@/lib/stores/mapStore';
import { WEB_MAPS, getWebMapId } from '@/lib/esri/webmaps';
import { SOLANO_SERVICES } from '@/lib/esri/webmaps';

// Note: Config imports not available client-side, use inline constants
// These values should match lib/config/endpoints.ts and lib/config/defaults.ts
const ESRI_JS_ASSETS = 'https://js.arcgis.com/4.34/@arcgis/core/assets';
const ESRI_ROUTE_SERVICE = 'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World';

// Map styling constants (should match lib/config/defaults.ts)
const MAP_COLORS = {
  highlightFill: [255, 255, 0, 0.3] as [number, number, number, number],
  highlightOutline: [255, 165, 0] as [number, number, number],
  routeLine: [0, 100, 255, 0.9] as [number, number, number, number],
  originMarker: [34, 197, 94] as [number, number, number],
  destinationMarker: [239, 68, 68] as [number, number, number],
  markerOutline: [255, 255, 255] as [number, number, number],
};

const MAP_DEFAULTS = {
  highlightZoom: 18,
  centerOnlyZoom: 15,
  highlightOutlineWidth: 3,
  routeLineWidth: 5,
  markerSize: 14,
  markerOutlineWidth: 2,
};

const MAP_VIEW_PADDING = { top: 80, bottom: 50, left: 50, right: 50 };

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
import Graphic from '@arcgis/core/Graphic';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import * as query from '@arcgis/core/rest/query';
import Query from '@arcgis/core/rest/support/Query';
import Point from '@arcgis/core/geometry/Point';
import Polyline from '@arcgis/core/geometry/Polyline';

// ESRI CSS - must be imported for proper styling
import '@arcgis/core/assets/esri/themes/light/main.css';

// Configure ESRI assets path - use CDN for reliable asset loading
esriConfig.assetsPath = ESRI_JS_ASSETS;

// Route endpoint coordinates
interface RouteStop {
  latitude: number;
  longitude: number;
  label?: string;
}

interface MapContainerProps {
  webMapId?: string;
  preset?: keyof typeof WEB_MAPS;
  className?: string;
  // URL parameter options for initial view
  initialCenter?: { longitude: number; latitude: number };
  initialZoom?: number;
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
  initialCenter,
  initialZoom,
  highlightApn,
  highlightAddress,
  routeOrigin,
  routeDestination,
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);
  const highlightLayerRef = useRef<GraphicsLayer | null>(null);
  const routeLayerRef = useRef<GraphicsLayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);

  const {
    setMapView,
    setWebMapId,
    setViewState,
    setLayers,
    setIsReady,
    setError,
    setSelectedFeatures,
  } = useMapStore();

  // Determine which Web Map ID to use
  const effectiveWebMapId = webMapId || getWebMapId(preset) || '';

  useEffect(() => {
    if (!mapRef.current) return;

    // Don't initialize if no Web Map ID is available
    if (!effectiveWebMapId) {
      const errorMsg = 'No Web Map ID configured. Please provide a webMapId or configure a preset.';
      setError(errorMsg);
      setLocalError(errorMsg);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    // Highlight symbol for parcels
    const highlightSymbol = new SimpleFillSymbol({
      color: [255, 255, 0, 0.3], // Yellow with transparency
      outline: {
        color: [255, 165, 0], // Orange outline
        width: 3,
      },
    });

    /**
     * Handle initial view positioning and feature highlighting based on URL params
     */
    const handleInitialView = async (view: MapView, highlightLayer: GraphicsLayer) => {
      // Priority: APN > Address > Center/Zoom

      if (highlightApn) {
        // Query parcel by APN and zoom to it
        try {
          console.log('Querying parcel by APN:', highlightApn);
          // parcelid field is the APN without dashes
          const apnNoDashes = highlightApn.replace(/-/g, '');
          const queryTask = new Query({
            where: `parcelid = '${apnNoDashes}' OR parcelid = '${highlightApn}'`,
            outFields: ['*'],
            returnGeometry: true,
          });

          const result = await query.executeQueryJSON(SOLANO_SERVICES.parcels, queryTask);

          if (result.features && result.features.length > 0) {
            const feature = result.features[0]!;

            // Add highlight graphic
            const graphic = new Graphic({
              geometry: feature.geometry ?? undefined,
              symbol: highlightSymbol,
              attributes: feature.attributes ?? {},
            });
            highlightLayer.add(graphic);

            // Zoom to the parcel with some padding
            if (feature.geometry) {
              await view.goTo({
                target: feature.geometry,
                zoom: initialZoom || 18,
              });
            }
            console.log('Highlighted parcel:', feature.attributes ?? {});
          } else {
            console.warn('No parcel found for APN:', highlightApn);
          }
        } catch (err) {
          console.error('Error querying parcel by APN:', err);
        }
      } else if (highlightAddress) {
        // Geocode address and zoom to it
        try {
          console.log('Geocoding address:', highlightAddress);
          const queryTask = new Query({
            where: `UPPER(fulladdress) LIKE UPPER('%${highlightAddress.replace(/'/g, "''")}%')`,
            outFields: ['*'],
            returnGeometry: true,
            num: 1,
          });

          const result = await query.executeQueryJSON(SOLANO_SERVICES.addressPoints, queryTask);

          if (result.features && result.features.length > 0) {
            const feature = result.features[0]!;
            const attrs = feature.attributes ?? {};
            const apn = attrs.APN || attrs.apn;

            // If we got an APN from the address, query the parcel to highlight it
            if (apn) {
              const apnNoDashes = apn.replace(/-/g, '');
              const parcelQuery = new Query({
                where: `parcelid = '${apnNoDashes}' OR parcelid = '${apn}'`,
                outFields: ['*'],
                returnGeometry: true,
              });

              const parcelResult = await query.executeQueryJSON(SOLANO_SERVICES.parcels, parcelQuery);

              if (parcelResult.features && parcelResult.features.length > 0) {
                const parcelFeature = parcelResult.features[0]!;
                const graphic = new Graphic({
                  geometry: parcelFeature.geometry ?? undefined,
                  symbol: highlightSymbol,
                  attributes: parcelFeature.attributes ?? {},
                });
                highlightLayer.add(graphic);

                if (parcelFeature.geometry) {
                  await view.goTo({
                    target: parcelFeature.geometry,
                    zoom: initialZoom || 18,
                  });
                }
                console.log('Highlighted parcel for address:', attrs);
                return;
              }
            }

            // Fallback: just zoom to the address point
            if (feature.geometry) {
              await view.goTo({
                target: feature.geometry,
                zoom: initialZoom || 18,
              });
            }
            console.log('Found address:', attrs);
          } else {
            console.warn('No address found for:', highlightAddress);
          }
        } catch (err) {
          console.error('Error geocoding address:', err);
        }
      } else if (initialCenter) {
        // Just zoom to the specified center/zoom
        await view.goTo({
          center: [initialCenter.longitude, initialCenter.latitude],
          zoom: initialZoom || 15,
        });
      } else if (initialZoom) {
        // Just set zoom level
        await view.goTo({ zoom: initialZoom });
      }
    };

    /**
     * Display a route between two points on the map using direct REST API
     * (bypasses ESRI JS SDK authentication to use our OAuth token)
     */
    const displayRoute = async (
      view: MapView,
      routeLayer: GraphicsLayer,
      origin: RouteStop,
      destination: RouteStop
    ) => {
      try {
        console.log('Fetching route from', origin, 'to', destination);

        // Create point objects for display
        const originPoint = new Point({
          longitude: origin.longitude,
          latitude: origin.latitude,
        });

        const destinationPoint = new Point({
          longitude: destination.longitude,
          latitude: destination.latitude,
        });

        // Call server-side route proxy (handles OAuth token and Referer header)
        const routeResponse = await fetch('/api/arcgis-route', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ origin, destination }),
        });

        const routeData = await routeResponse.json();

        if (routeData.error) {
          console.error('Routing API error:', routeData.error);
          return;
        }

        // Display the route
        if (routeData.routes?.features?.length > 0) {
          const routeFeature = routeData.routes.features[0];
          const routePaths = routeFeature.geometry.paths;

          // Create polyline from route paths
          const routeGeometry = new Polyline({
            paths: routePaths,
            spatialReference: { wkid: 4326 },
          });

          // Route line symbol - blue
          const routeSymbol = new SimpleLineSymbol({
            color: [0, 100, 255, 0.9],
            width: 5,
            style: 'solid',
            cap: 'round',
            join: 'round',
          });

          // Add route to map
          const routeGraphic = new Graphic({
            geometry: routeGeometry,
            symbol: routeSymbol,
          });
          routeLayer.add(routeGraphic);

          // Origin marker - green
          const originSymbol = new SimpleMarkerSymbol({
            color: [34, 197, 94],
            size: 14,
            outline: {
              color: [255, 255, 255],
              width: 2,
            },
          });
          routeLayer.add(
            new Graphic({
              geometry: originPoint,
              symbol: originSymbol,
              attributes: { type: 'origin', label: origin.label || 'Start' },
            })
          );

          // Destination marker - red
          const destinationSymbol = new SimpleMarkerSymbol({
            color: [239, 68, 68],
            size: 14,
            outline: {
              color: [255, 255, 255],
              width: 2,
            },
          });
          routeLayer.add(
            new Graphic({
              geometry: destinationPoint,
              symbol: destinationSymbol,
              attributes: { type: 'destination', label: destination.label || 'End' },
            })
          );

          // Get route info from attributes
          const attrs = routeFeature.attributes;
          const totalMiles = attrs?.Total_Miles || attrs?.Total_Length || attrs?.Shape_Length / 1609.34 || 0;
          const totalMinutes = attrs?.Total_TravelTime || attrs?.Total_Time || 0;

          // Format duration
          let durationText: string;
          if (totalMinutes < 60) {
            durationText = `${Math.round(totalMinutes)} min`;
          } else {
            const hours = Math.floor(totalMinutes / 60);
            const mins = Math.round(totalMinutes % 60);
            durationText = mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
          }

          setRouteInfo({
            distance: `${totalMiles.toFixed(1)} mi`,
            duration: durationText,
          });

          // Zoom to show the entire route
          await view.goTo({
            target: routeGeometry,
            padding: { top: 80, bottom: 50, left: 50, right: 50 },
          });

          console.log('Route displayed:', {
            distance: totalMiles.toFixed(2) + ' miles',
            duration: durationText,
          });
        }
      } catch (err) {
        console.error('Error displaying route:', err);
      }
    };

    const initializeMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

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
        });

        // Wait for the view to be ready
        await view.when();

        if (!isMounted) {
          view.destroy();
          return;
        }

        viewRef.current = view;

        // Ensure all layers are loaded
        if (view.map) {
          await Promise.all(
            view.map.allLayers.map(async (layer) => {
              if (layer.load) {
                await layer.load();
              }
            })
          );

          // Log layer info after load
          console.log('Layers loaded:', view.map.allLayers.map(l => `${l.title} (${l.type})`).toArray());
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
        await handleInitialView(view, highlightLayer);

        // Display route if origin and destination are provided
        if (routeOrigin && routeDestination) {
          await displayRoute(view, routeLayer, routeOrigin, routeDestination);
        }

        // Store the view reference for MCP tools
        setMapView(view);
        setWebMapId(effectiveWebMapId);
        setIsReady(true);
        setIsLoading(false);

        // Add widgets
        addWidgets(view);

        // Sync initial view state
        syncViewState(view);

        // Sync layer list
        syncLayers(view);

        // Set up event listeners
        setupEventListeners(view);
      } catch (error) {
        console.error('Failed to initialize map:', error);
        if (isMounted) {
          const errorMsg = error instanceof Error ? error.message : 'Failed to load map';
          setError(errorMsg);
          setLocalError(errorMsg);
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
    };

    const syncViewState = (view: MapView) => {
      // Guard against null/undefined values during map initialization
      if (!view.center || view.zoom === undefined) return;

      const state: MapViewState = {
        center: {
          longitude: view.center.longitude ?? 0,
          latitude: view.center.latitude ?? 0,
        },
        zoom: view.zoom ?? 10,
        rotation: view.rotation ?? 0,
        scale: view.scale ?? 0,
      };
      setViewState(state);
    };

    const syncLayers = (view: MapView) => {
      if (!view.map?.allLayers) return;

      const layers: LayerInfo[] = [];
      view.map.allLayers.forEach((layer) => {
        layers.push({
          id: layer.id,
          title: layer.title || layer.id,
          visible: layer.visible,
          opacity: layer.opacity,
          type: layer.type,
        });
      });
      setLayers(layers);
    };

    const setupEventListeners = (view: MapView) => {
      // Sync view state on move
      view.watch(['center', 'zoom', 'rotation', 'scale'], () => {
        syncViewState(view);
      });

      // Handle click for feature identification
      view.on('click', async (event) => {
        try {
          const response = await view.hitTest(event, {
            include: view.map?.allLayers?.filter(
              (l) => l.type === 'feature' || l.type === 'map-image'
            ),
          });

          if (response.results.length > 0) {
            const features = response.results
              .filter((result) => result.type === 'graphic')
              .map((result) => {
                const graphicResult = result as __esri.GraphicHit;
                return {
                  layerId: graphicResult.layer?.id || 'unknown',
                  layerTitle: graphicResult.layer?.title || 'Unknown Layer',
                  attributes: graphicResult.graphic.attributes || {},
                  geometry: graphicResult.graphic.geometry,
                };
              });

            setSelectedFeatures(features);
          } else {
            setSelectedFeatures([]);
          }
        } catch (error) {
          console.error('Error during hit test:', error);
        }
      });

      // Sync layers when they change
      view.map?.allLayers?.on('change', () => {
        syncLayers(view);
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
      setMapView(null);
      setIsReady(false);
    };
  }, [
    effectiveWebMapId,
    setMapView,
    setWebMapId,
    setViewState,
    setLayers,
    setIsReady,
    setError,
    setSelectedFeatures,
  ]);

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
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
            <p className="text-gray-400 text-sm mt-2">Web Map ID: {effectiveWebMapId}</p>
          </div>
        </div>
      )}

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
