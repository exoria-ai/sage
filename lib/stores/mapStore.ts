import { create } from 'zustand';

/**
 * Map state store for SAGE interactive map
 *
 * This store is shared between:
 * - The React map component (reads/writes state)
 * - MCP tools (reads/writes state to control the map)
 *
 * The mapView reference allows MCP tools to directly manipulate the ESRI map.
 */

// Type definitions for map state
// We use 'any' for ESRI types initially to avoid import issues in non-browser contexts
// These will be properly typed when used in the map component

export interface MapViewState {
  center: { longitude: number; latitude: number };
  zoom: number;
  rotation: number;
  scale: number;
}

export interface DrawingInfo {
  id: string;
  type: 'point' | 'polyline' | 'polygon' | 'circle';
  geometry: unknown; // ESRI Geometry
  name?: string;
  measurements?: {
    area?: { squareFeet: number; acres: number };
    length?: { feet: number; miles: number };
    perimeter?: { feet: number };
  };
}

export interface SelectedFeature {
  layerId: string;
  layerTitle: string;
  attributes: Record<string, unknown>;
  geometry?: unknown; // ESRI Geometry
}

export interface LayerInfo {
  id: string;
  title: string;
  visible: boolean;
  opacity: number;
  type: string;
}

interface MapStore {
  // ESRI MapView instance reference (set by React component)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapView: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMapView: (view: any) => void;

  // Current Web Map ID
  webMapId: string;
  setWebMapId: (id: string) => void;

  // View state (synced from mapView)
  viewState: MapViewState | null;
  setViewState: (state: MapViewState) => void;

  // Layer visibility tracking
  layers: LayerInfo[];
  setLayers: (layers: LayerInfo[]) => void;
  setLayerVisibility: (layerId: string, visible: boolean) => void;
  setLayerOpacity: (layerId: string, opacity: number) => void;

  // User drawings
  drawings: DrawingInfo[];
  addDrawing: (drawing: DrawingInfo) => void;
  removeDrawing: (id: string) => void;
  clearDrawings: () => void;

  // Selected features (from click/select)
  selectedFeatures: SelectedFeature[];
  setSelectedFeatures: (features: SelectedFeature[]) => void;
  clearSelection: () => void;

  // Current basemap
  basemap: string;
  setBasemap: (basemap: string) => void;

  // Map ready state
  isReady: boolean;
  setIsReady: (ready: boolean) => void;

  // Error state
  error: string | null;
  setError: (error: string | null) => void;

  // Identify mode
  identifyModeActive: boolean;
  setIdentifyModeActive: (active: boolean) => void;
  toggleIdentifyMode: () => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  // Map view reference
  mapView: null,
  setMapView: (view) => set({ mapView: view }),

  // Web Map ID (placeholder until Ryan provides one)
  webMapId: '',
  setWebMapId: (id) => set({ webMapId: id }),

  // View state
  viewState: null,
  setViewState: (state) => set({ viewState: state }),

  // Layers
  layers: [],
  setLayers: (layers) => set({ layers }),
  setLayerVisibility: (layerId, visible) => {
    const { layers, mapView } = get();
    // Update local state
    const updatedLayers = layers.map((layer) =>
      layer.id === layerId ? { ...layer, visible } : layer
    );
    set({ layers: updatedLayers });

    // Update actual map layer if mapView exists
    if (mapView) {
      const layer = mapView.map?.findLayerById(layerId);
      if (layer) {
        layer.visible = visible;
      }
    }
  },
  setLayerOpacity: (layerId, opacity) => {
    const { layers, mapView } = get();
    const updatedLayers = layers.map((layer) =>
      layer.id === layerId ? { ...layer, opacity } : layer
    );
    set({ layers: updatedLayers });

    if (mapView) {
      const layer = mapView.map?.findLayerById(layerId);
      if (layer) {
        layer.opacity = opacity;
      }
    }
  },

  // Drawings
  drawings: [],
  addDrawing: (drawing) =>
    set((state) => ({ drawings: [...state.drawings, drawing] })),
  removeDrawing: (id) =>
    set((state) => ({
      drawings: state.drawings.filter((d) => d.id !== id),
    })),
  clearDrawings: () => set({ drawings: [] }),

  // Selection
  selectedFeatures: [],
  setSelectedFeatures: (features) => set({ selectedFeatures: features }),
  clearSelection: () => set({ selectedFeatures: [] }),

  // Basemap
  basemap: 'hybrid',
  setBasemap: (basemap) => set({ basemap }),

  // Ready state
  isReady: false,
  setIsReady: (ready) => set({ isReady: ready }),

  // Error
  error: null,
  setError: (error) => set({ error }),

  // Identify mode
  identifyModeActive: false,
  setIdentifyModeActive: (active) => set({ identifyModeActive: active }),
  toggleIdentifyMode: () => set((state) => ({ identifyModeActive: !state.identifyModeActive })),
}));

