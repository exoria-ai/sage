import type MapView from '@arcgis/core/views/MapView';
import type GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Expand from '@arcgis/core/widgets/Expand';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Graphic from '@arcgis/core/Graphic';
import Search from '@arcgis/core/widgets/Search';
import LayerSearchSource from '@arcgis/core/widgets/Search/LayerSearchSource';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import * as query from '@arcgis/core/rest/query';
import Query from '@arcgis/core/rest/support/Query';

import { SOLANO_SERVICES } from '@/lib/esri/webmaps';
import { normalizeApnForQuery } from '@/lib/utils/apn';

/**
 * Map styling constants
 */
const MAP_STYLES = {
  highlightOutline: [255, 165, 0] as [number, number, number], // Orange
  highlightOutlineWidth: 3,
};

/**
 * Options for widget configuration
 */
export interface AddWidgetsOptions {
  /** Reference to the highlight graphics layer */
  highlightLayerRef: React.MutableRefObject<GraphicsLayer | null>;
  /** Reference to store the identify button element */
  identifyButtonRef: React.MutableRefObject<HTMLDivElement | null>;
  /** Callback to toggle identify mode */
  toggleIdentifyMode: () => void;
}

/**
 * Add all standard map widgets to the view.
 *
 * Includes:
 * - Scale bar (bottom-left)
 * - Layer list with actions (top-right, expanded by default)
 * - Legend (top-right)
 * - Basemap gallery (top-right)
 * - Search widget for addresses and parcels (top-left, manual position)
 * - Identify button (top-left)
 */
export function addMapWidgets(view: MapView, options: AddWidgetsOptions): void {
  const { highlightLayerRef, identifyButtonRef, toggleIdentifyMode } = options;

  // Scale bar
  addScaleBar(view);

  // Layer list with actions
  addLayerList(view);

  // Legend
  addLegend(view);

  // Basemap gallery
  addBasemapGallery(view);

  // Search widget
  addSearchWidget(view, highlightLayerRef);

  // Identify button
  addIdentifyButton(view, identifyButtonRef, toggleIdentifyMode);
}

/**
 * Add scale bar widget
 */
function addScaleBar(view: MapView): void {
  const scaleBar = new ScaleBar({
    view,
    unit: 'dual', // Shows both metric and non-metric
  });
  view.ui.add(scaleBar, 'bottom-left');
}

/**
 * Add layer list widget with zoom-to-extent and opacity controls
 */
function addLayerList(view: MapView): void {
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
}

/**
 * Add legend widget
 */
function addLegend(view: MapView): void {
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
}

/**
 * Add basemap gallery widget
 */
function addBasemapGallery(view: MapView): void {
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
}

/**
 * Add search widget with address and parcel (APN) sources
 */
function addSearchWidget(
  view: MapView,
  highlightLayerRef: React.MutableRefObject<GraphicsLayer | null>
): void {
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
}

/**
 * Add identify button toggle
 */
function addIdentifyButton(
  view: MapView,
  identifyButtonRef: React.MutableRefObject<HTMLDivElement | null>,
  toggleIdentifyMode: () => void
): void {
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
}
