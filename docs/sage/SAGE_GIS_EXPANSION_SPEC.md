# SAGE GIS Expansion Specification
## Interactive Mapping with Native ESRI Stack

**Version:** 2.0
**Date:** January 2026
**Status:** Active Development
**Last Updated:** 2026-01-18

---

## Executive Summary

This specification outlines the expansion of SAGE (Solano Agent for Geographic Enquiry) from a static map rendering system to a full-featured interactive GIS platform. **Version 2.0** pivots to a native ESRI stack, leveraging ArcGIS Online Web Maps and the ArcGIS Maps SDK for JavaScript instead of MapLibre.

### Key Changes from v1.0

| Aspect | v1.0 (Original) | v2.0 (ESRI-Native) |
|--------|-----------------|---------------------|
| Map Renderer | MapLibre GL JS | **ArcGIS Maps SDK for JavaScript** |
| Basemaps | CARTO + manual tiles | **ESRI basemaps + Solano aerials** |
| Layer Config | Custom JSON definitions | **ArcGIS Online Web Maps** |
| Drawing | MapLibre Draw + Turf.js | **ESRI Sketch widget + Geometry Engine** |
| Analysis | Custom implementations | **ESRI Geometry Service** |
| State Sync | WebSocket bridge | **Shared Zustand store (same app)** |

### Key Goals

1. **Interactive Map Experience** - Replace static image exports with a live, pannable, zoomable web map
2. **Dynamic Layer Control** - Enable real-time toggling of GIS layers with intelligent defaults
3. **Drawing & Annotation Tools** - Allow users to sketch, measure, and annotate directly on the map
4. **Enhanced Spatial Analysis** - Expand query capabilities beyond point lookups to area-based analysis
5. **Native ESRI Integration** - Leverage ArcGIS Online for configuration, reduce custom code
6. **Agent-Driven UX** - Claude orchestrates map state, layer visibility, and view management through natural conversation

---

## Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [Architecture Overview](#2-architecture-overview)
3. [Parallel Work Plan](#3-parallel-work-plan)
4. [ESRI Infrastructure Setup](#4-esri-infrastructure-setup)
5. [Interactive Map Component](#5-interactive-map-component)
6. [Layer Management System](#6-layer-management-system)
7. [Drawing & Annotation Tools](#7-drawing--annotation-tools)
8. [Spatial Analysis](#8-spatial-analysis)
9. [Agent Integration](#9-agent-integration)
10. [Data Layer Catalog](#10-data-layer-catalog)
11. [Technical Implementation](#11-technical-implementation)
12. [Migration Strategy](#12-migration-strategy)
13. [Success Metrics](#13-success-metrics)

---

## 1. Current State Analysis

### 1.1 Existing Capabilities

SAGE currently provides:

| Capability | Implementation | Limitations |
|------------|----------------|-------------|
| **Map Rendering** | Static PNG/JPEG via Sharp compositing (43K+ lines) | No interactivity, fixed viewport |
| **Basemaps** | CARTO Voyager streets, Solano aerial tiles | Switch requires re-render |
| **Parcel Display** | ArcGIS Feature Server export as overlay | No click interaction |
| **Buffer Visualization** | Drawn circles with highlighted parcels | Static, fixed radius |
| **Geocoding** | ArcGIS Address Points layer | Working well |
| **Parcel Lookup** | ArcGIS Parcels_Public_Aumentum | Working well |
| **Zoning** | Intelligent jurisdiction routing | Working well |
| **Hazard Zones** | FEMA flood + CAL FIRE severity | Working well |

### 1.2 Current Map Rendering Pipeline (To Be Replaced)

```
User Request → Agent Interprets → render_map tool →
  ├── Fetch basemap tiles (CARTO/Solano)
  ├── Query parcel geometry (ArcGIS)
  ├── Composite layers (Sharp) ← 43,000+ lines of code
  ├── Add UI elements (north arrow, watermark)
  └── Return base64 PNG → Display in chat
```

### 1.3 Key Limitations to Address

1. **No Pan/Zoom** - Users cannot explore beyond the rendered viewport
2. **No Click Interaction** - Cannot click features to get information
3. **Layer Rigidity** - All layer combinations require new renders
4. **No Drawing** - Cannot sketch areas of interest or measure distances
5. **Context Loss** - Map state doesn't persist across conversation turns
6. **No Feature Selection** - Cannot select multiple parcels visually
7. **Code Complexity** - 43K+ lines of SVG/Sharp code to maintain

---

## 2. Architecture Overview

### 2.1 High-Level Architecture (ESRI-Native)

```
┌─────────────────────────────────────────────────────────────────┐
│                      SAGE Interactive Map                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌────────────────┐  ┌───────────────────┐   │
│  │  Map Viewer   │  │ Layer Control  │  │ Drawing Tools     │   │
│  │  (ESRI JS)    │  │ (LayerList)    │  │ (Sketch Widget)   │   │
│  └───────┬───────┘  └───────┬────────┘  └────────┬──────────┘   │
│          │                  │                     │              │
│  ┌───────┴──────────────────┴─────────────────────┴──────────┐  │
│  │              Zustand Store (Shared State)                  │  │
│  │  (view, layers, drawings, selections, webMapId)           │  │
│  └───────────────────────────┬───────────────────────────────┘  │
├──────────────────────────────┼──────────────────────────────────┤
│  ┌───────────────────────────┴───────────────────────────────┐  │
│  │                    MCP Tool Interface                      │  │
│  │  map_*, layer_*, draw_*, select_*, analyze_*              │  │
│  └───────────────────────────┬───────────────────────────────┘  │
├──────────────────────────────┼──────────────────────────────────┤
│  ┌───────────────────────────┴───────────────────────────────┐  │
│  │              ArcGIS Online (Configuration Layer)           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐    │  │
│  │  │  Web Maps   │  │  Hosted     │  │  Geometry       │    │  │
│  │  │  (configs)  │  │  Layers     │  │  Service        │    │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘    │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    External Data Services                  │  │
│  ├─────────────┬─────────────┬─────────────┬─────────────────┤  │
│  │   Solano    │    FEMA     │  CAL FIRE   │    ESRI         │  │
│  │   ArcGIS    │    NFHL     │    FHSZ     │    Basemaps     │  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Why ESRI-Native?

| Benefit | Description |
|---------|-------------|
| **Native ArcGIS Integration** | First-class support for ArcGIS services, no adapter code |
| **Web Map Configuration** | Define layers, symbology, popups in AGOL - no code changes |
| **Built-in Widgets** | LayerList, Legend, Sketch, Measurement, Print - ready to use |
| **Geometry Engine** | Client-side spatial analysis without custom Turf.js code |
| **Authentication** | OAuth/API key support for premium services |
| **Print Service** | Native export to PDF/PNG for reports |
| **Reduced Codebase** | Eliminate 43K+ lines of render-map.ts |

### 2.3 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Map Renderer** | ArcGIS Maps SDK for JavaScript 4.x | Native ESRI, WebGL, full widget library |
| **Web Maps** | ArcGIS Online | Configuration-driven layers, no code for styling |
| **State Management** | Zustand | Lightweight, shared between map and MCP tools |
| **Drawing** | ESRI Sketch Widget | Native, measurements built-in |
| **Analysis** | ESRI Geometry Engine + Geometry Service | Client + server-side spatial ops |
| **Framework** | Next.js 15 (existing) | Current infrastructure |
| **Hosting** | Vercel | Current infrastructure |

---

## 3. Parallel Work Plan

### 3.1 Overview

Work is divided between **Ryan (ESRI Setup)** and **Claude (Code Implementation)** to maximize parallelism.

```
┌─────────────────────────────────────────────────────────────────┐
│                        PHASE 1: Foundation                       │
├────────────────────────────┬────────────────────────────────────┤
│      RYAN (Browser)        │         CLAUDE (Code)              │
├────────────────────────────┼────────────────────────────────────┤
│ □ Log into ArcGIS Online   │ □ Install @arcgis/core package    │
│ □ Create sage-base Web Map │ □ Create MapContainer component   │
│ □ Add Solano parcels layer │ □ Create useMapStore hook         │
│ □ Configure parcel popups  │ □ Add /map route to Next.js       │
│ □ Set default extent       │ □ Implement map_load_webmap tool  │
│ □ Share map (public/token) │ □ Wire up basic MCP integration   │
├────────────────────────────┴────────────────────────────────────┤
│ SYNC POINT: Ryan provides Web Map ID → Claude loads it          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      PHASE 2: Layer System                       │
├────────────────────────────┬────────────────────────────────────┤
│      RYAN (Browser)        │         CLAUDE (Code)              │
├────────────────────────────┼────────────────────────────────────┤
│ □ Create sage-hazards map  │ □ Add LayerList widget            │
│ □ Create sage-zoning map   │ □ Implement layer_* MCP tools     │
│ □ Add FEMA flood layer     │ □ Add BasemapGallery widget       │
│ □ Add CAL FIRE layer       │ □ Create layer toggle UI          │
│ □ Configure layer symbology│ □ Implement preset switching      │
│ □ Set up layer groups      │ □ Add map state persistence       │
├────────────────────────────┴────────────────────────────────────┤
│ SYNC POINT: Multiple Web Maps ready → Claude adds map switcher  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: Drawing & Analysis                   │
├────────────────────────────┬────────────────────────────────────┤
│      RYAN (Browser)        │         CLAUDE (Code)              │
├────────────────────────────┼────────────────────────────────────┤
│ □ Test Geometry Service    │ □ Add Sketch widget               │
│ □ Verify credit usage      │ □ Implement draw_* MCP tools      │
│ □ Configure Print Service  │ □ Add Measurement widget          │
│ □ Test layer query perf    │ □ Implement analyze_* tools       │
│                            │ □ Add feature selection           │
│                            │ □ Implement Print widget          │
├────────────────────────────┴────────────────────────────────────┤
│ SYNC POINT: Full interactive map with all features              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      PHASE 4: Polish & Migration                 │
├────────────────────────────┬────────────────────────────────────┤
│      RYAN (Browser)        │         CLAUDE (Code)              │
├────────────────────────────┼────────────────────────────────────┤
│ □ Fine-tune symbology      │ □ Deprecate render_map tool       │
│ □ Optimize layer perf      │ □ Add mobile responsiveness       │
│ □ Create prod Web Maps     │ □ Error handling & fallbacks      │
│ □ Document AGOL setup      │ □ Update tool documentation       │
│                            │ □ Performance optimization        │
├────────────────────────────┴────────────────────────────────────┤
│ DELIVERABLE: Production-ready interactive map                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Detailed Task Breakdown

#### PHASE 1: Foundation

**RYAN's Tasks (ArcGIS Online - Browser)**

| # | Task | Details | Output |
|---|------|---------|--------|
| R1.1 | Log into ArcGIS Online | Go to arcgis.com, sign in with personal account | Access confirmed |
| R1.2 | Create Web Map | Content → Create → Map | Web Map created |
| R1.3 | Add Solano Parcels | Add Layer → URL → `https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services/Parcels_Public_Aumentum/FeatureServer/0` | Parcels visible |
| R1.4 | Configure Popup | Click parcel → Configure popup → Add fields: APN, Address, Acres, Use | Popup configured |
| R1.5 | Add City Boundaries | Add Layer → URL → `https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services/CityBoundary/FeatureServer/2` | Boundaries visible |
| R1.6 | Set Default Extent | Zoom to Solano County → Map Properties → Save extent | Extent saved |
| R1.7 | Choose Basemap | Basemap → Imagery or Streets | Basemap set |
| R1.8 | Save & Share | Save → Share → Everyone (public) OR generate API key | **Web Map ID** |

**CLAUDE's Tasks (Code)**

| # | Task | Details | Output |
|---|------|---------|--------|
| C1.1 | Install ESRI SDK | `npm install @arcgis/core` | Package installed |
| C1.2 | Configure Next.js | Add ESRI CSS, configure webpack for ESRI | Build works |
| C1.3 | Create MapContainer | `app/components/map/MapContainer.tsx` | Component created |
| C1.4 | Create map store | `lib/stores/mapStore.ts` with Zustand | Store created |
| C1.5 | Add /map route | `app/map/page.tsx` | Route accessible |
| C1.6 | Load Web Map | Use WebMap class with Ryan's ID | Map displays |
| C1.7 | Add MCP tool | `map_load_webmap` tool | Tool works |
| C1.8 | Basic navigation | Pan, zoom, click working | Interactive |

**Sync Point 1:** Ryan provides Web Map ID (e.g., `a1b2c3d4e5f6...`) → Claude updates code to load it.

---

#### PHASE 2: Layer System

**RYAN's Tasks (ArcGIS Online)**

| # | Task | Details | Output |
|---|------|---------|--------|
| R2.1 | Create hazards map | New Web Map with flood + fire layers | sage-hazards ID |
| R2.2 | Add FEMA flood | URL: `https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer` | Flood layer added |
| R2.3 | Add CAL FIRE | URL: `https://services.gis.ca.gov/arcgis/rest/services/Environment/Fire_Severity_Zones/MapServer` | Fire layer added |
| R2.4 | Configure symbology | Style flood zones by risk, fire by severity | Colors set |
| R2.5 | Create zoning map | New Web Map with county + city zoning | sage-zoning ID |
| R2.6 | Add all zoning layers | County + 7 city zoning services | All zoning added |
| R2.7 | Set up layer groups | Group by category (hazards, zoning, etc.) | Groups organized |
| R2.8 | Share all maps | Public or API key access | All IDs ready |

**CLAUDE's Tasks (Code)**

| # | Task | Details | Output |
|---|------|---------|--------|
| C2.1 | Add LayerList widget | ESRI LayerList in sidebar | Widget visible |
| C2.2 | Implement layer tools | `layer_set_visibility`, `layer_list`, etc. | Tools work |
| C2.3 | Add BasemapGallery | ESRI BasemapGallery widget | Basemap switching |
| C2.4 | Web Map switcher | UI to switch between Ryan's Web Maps | Switcher works |
| C2.5 | Implement presets | `layer_apply_preset` with map switching | Presets work |
| C2.6 | State persistence | Save/restore map state across sessions | State persists |
| C2.7 | Sync layer state | MCP tools update Zustand → map reflects | State synced |

**Sync Point 2:** Ryan provides all Web Map IDs → Claude adds to map switcher.

---

#### PHASE 3: Drawing & Analysis

**RYAN's Tasks (ArcGIS Online)**

| # | Task | Details | Output |
|---|------|---------|--------|
| R3.1 | Test Geometry Service | Try buffer operation in Map Viewer | Service works |
| R3.2 | Check credit usage | Monitor credits for analysis operations | Usage documented |
| R3.3 | Configure Print Service | Test print/export functionality | Print works |
| R3.4 | Query performance | Test large parcel queries, note limits | Limits documented |
| R3.5 | Document setup | Write up AGOL configuration steps | Documentation |

**CLAUDE's Tasks (Code)**

| # | Task | Details | Output |
|---|------|---------|--------|
| C3.1 | Add Sketch widget | ESRI Sketch for drawing | Drawing works |
| C3.2 | Implement draw tools | `draw_create`, `draw_enable_mode`, etc. | Tools work |
| C3.3 | Add Measurement widget | ESRI Measurement for distance/area | Measurement works |
| C3.4 | Buffer analysis | `analyze_buffer` using Geometry Engine | Buffer works |
| C3.5 | Intersection analysis | `analyze_intersection` tool | Intersection works |
| C3.6 | Feature selection | Click/box select features | Selection works |
| C3.7 | Add Print widget | ESRI Print for export | Print works |
| C3.8 | Site selection | `analyze_site_selection` tool | Site selection works |

**Sync Point 3:** Full feature parity with spec, ready for testing.

---

#### PHASE 4: Polish & Migration

**RYAN's Tasks**

| # | Task | Details | Output |
|---|------|---------|--------|
| R4.1 | Fine-tune symbology | Adjust colors, labels based on feedback | Polished maps |
| R4.2 | Performance check | Verify map loads fast, layers responsive | Performance OK |
| R4.3 | Create prod maps | Production versions with final config | Prod map IDs |
| R4.4 | Document AGOL | How to update maps, add layers, etc. | AGOL docs |

**CLAUDE's Tasks**

| # | Task | Details | Output |
|---|------|---------|--------|
| C4.1 | Deprecate render_map | Add deprecation notice, fallback logic | Deprecation done |
| C4.2 | Mobile responsive | Touch gestures, responsive layout | Mobile works |
| C4.3 | Error handling | Graceful failures, retry logic | Robust errors |
| C4.4 | Update MCP docs | New tool descriptions | Docs updated |
| C4.5 | Performance | Optimize bundle, lazy load | Fast loading |
| C4.6 | Integration tests | Test all MCP tools end-to-end | Tests pass |

**Deliverable:** Production-ready interactive map system.

---

### 3.3 Quick Reference: What You Can Do Browser-Only

With ArcGIS Online (no ArcGIS Pro needed):

| ✅ Can Do | ❌ Cannot Do |
|-----------|--------------|
| Create Web Maps | Complex geoprocessing services |
| Add layers (reference existing) | Custom vector tile packages |
| Configure popups | Offline map packages |
| Set symbology (colors, sizes) | Advanced cartography |
| Group layers | 3D scenes (limited) |
| Set default extent | |
| Share publicly or with key | |
| Use all standard widgets | |

---

## 4. ESRI Infrastructure Setup

### 4.1 ArcGIS Online Organization

**Account Type:** Personal Account (renewed)

**Recommended Content Structure:**

```
My Content/
├── SAGE/
│   ├── Web Maps/
│   │   ├── sage-base (parcels, boundaries, basemap)
│   │   ├── sage-hazards (flood, fire, parcels)
│   │   ├── sage-zoning (all zoning layers)
│   │   ├── sage-environmental (wetlands, farmland, soils)
│   │   └── sage-districts (supervisors, water, fire, school)
│   │
│   └── [Optional] Hosted Layers/
│       └── (Only if we need to cache/transform data)
```

### 4.2 Web Map Configurations

#### sage-base (Property Research)

| Setting | Value |
|---------|-------|
| **Basemap** | ESRI Imagery with Labels |
| **Default Extent** | Solano County |
| **Layers** | Parcels, City Boundaries, County Boundary |
| **Popup** | APN, Address, Acres, Use, Year Built |

#### sage-hazards (Risk Assessment)

| Setting | Value |
|---------|-------|
| **Basemap** | ESRI Streets |
| **Layers** | Parcels, FEMA Flood Zones, CAL FIRE Severity |
| **Popup** | Flood zone code + risk description, Fire severity |

#### sage-zoning (Planning)

| Setting | Value |
|---------|-------|
| **Basemap** | ESRI Streets |
| **Layers** | Parcels, County Zoning, All City Zoning (grouped) |
| **Popup** | Zoning code, description, allowed uses |

### 4.3 Authentication Strategy

**Option A: Public Maps (Recommended for Start)**
- Share maps as "Everyone (public)"
- No API key needed
- Consuming public Solano services = free
- ESRI basemaps = free with attribution

**Option B: API Key (If Needed Later)**
- Generate in AGOL → API Keys
- Required for: premium services, higher rate limits
- Add to `.env.local`: `NEXT_PUBLIC_ARCGIS_API_KEY=xxx`

### 4.4 Credit Considerations

| Operation | Credit Cost | Notes |
|-----------|-------------|-------|
| Viewing maps | Free | Public services |
| Geometry Service (buffer, etc.) | ~1 credit/1000 ops | Client-side free |
| Geocoding | 40 credits/1000 | We use Solano's free service |
| Printing | 2.5 credits/map | Use sparingly |
| Hosted tile views | Varies | Only if we host layers |

**Strategy:** Use client-side Geometry Engine (free) for most analysis. Reserve server-side Geometry Service for complex operations.

---

## 5. Interactive Map Component

### 5.1 Map Viewer Specifications

#### 5.1.1 Core Capabilities

```typescript
interface MapViewerCapabilities {
  // Navigation
  pan: boolean;           // Click-drag to pan
  zoom: boolean;          // Scroll/pinch to zoom (levels 1-20)
  rotate: boolean;        // Optional 3D bearing rotation
  pitch: boolean;         // Optional 3D tilt (aerial views)

  // Interaction
  clickIdentify: boolean; // Click feature → show popup
  hoverHighlight: boolean;// Hover → highlight feature
  boxSelect: boolean;     // Shift-drag → select multiple

  // Display
  scaleBar: boolean;      // Dynamic scale indicator
  coordinates: boolean;   // Cursor lat/lon display

  // ESRI Widgets
  layerList: boolean;     // Layer toggle panel
  basemapGallery: boolean;// Basemap switcher
  legend: boolean;        // Layer legend
  print: boolean;         // Export to PDF/image
  sketch: boolean;        // Drawing tools
  measurement: boolean;   // Distance/area measurement
}
```

#### 5.1.2 View State Schema

```typescript
interface MapViewState {
  center: { longitude: number; latitude: number };
  zoom: number;              // 0-22, default 15
  rotation: number;          // 0-360, default 0 (north up)
  tilt: number;              // 0-90, default 0 (top-down)
  extent?: __esri.Extent;    // Current visible extent
}

interface MapState {
  view: MapViewState;
  webMapId: string;          // Current Web Map ID
  visibleLayers: string[];   // Layer IDs that are visible
  selectedFeatures: __esri.Graphic[];
  drawings: __esri.Graphic[];
  basemap: string;
}
```

#### 5.1.3 Web Map Presets

| Preset ID | Web Map | Description |
|-----------|---------|-------------|
| `base` | sage-base | Property research default |
| `hazards` | sage-hazards | Flood and fire assessment |
| `zoning` | sage-zoning | Zoning analysis |
| `environmental` | sage-environmental | Environmental review |
| `districts` | sage-districts | District lookup |

### 5.2 MCP Map Control Tools

#### 5.2.1 `map_load_webmap`

```typescript
interface MapLoadWebmapInput {
  webMapId?: string;        // Specific Web Map ID
  preset?: 'base' | 'hazards' | 'zoning' | 'environmental' | 'districts';
}

// Example: "Show me the hazard assessment map"
map_load_webmap({ preset: 'hazards' })
```

#### 5.2.2 `map_set_view`

```typescript
interface MapSetViewInput {
  center?: { longitude: number; latitude: number };
  zoom?: number;
  extent?: { xmin: number; ymin: number; xmax: number; ymax: number };
  animate?: boolean;
}

// Example: "Zoom to that parcel"
map_set_view({ center: { longitude: -122.04, latitude: 38.25 }, zoom: 18 })
```

#### 5.2.3 `map_get_state`

```typescript
interface MapGetStateOutput {
  view: MapViewState;
  webMapId: string;
  visibleLayers: string[];
  selectedFeatures: FeatureInfo[];
  drawings: DrawingInfo[];
  basemap: string;
}
```

#### 5.2.4 `map_fit_features`

```typescript
interface MapFitFeaturesInput {
  apns?: string[];           // Fit to these parcels
  layerId?: string;          // Fit to all features in layer
  padding?: number;          // Pixels of padding (default 50)
}
```

#### 5.2.5 `map_screenshot`

```typescript
interface MapScreenshotInput {
  format?: 'png' | 'jpg';
  width?: number;
  height?: number;
}

interface MapScreenshotOutput {
  dataUrl: string;           // Base64 image
}
```

---

## 6. Layer Management System

### 6.1 Layer Architecture (ESRI-Native)

Layers are configured in ArcGIS Online Web Maps, not in code. The application:

1. Loads a Web Map by ID
2. ESRI SDK automatically handles layer sources, symbology, popups
3. MCP tools toggle visibility, filter, query

```typescript
// No more manual layer definitions like this:
// const LAYERS = { parcels: { url: '...', style: {...} } }  // ❌ OLD

// Instead, just load the Web Map:
const webMap = new WebMap({ portalItem: { id: webMapId } });  // ✅ NEW
```

### 6.2 Layer Control via ESRI Widgets

```typescript
// LayerList widget - built-in UI for toggling layers
const layerList = new LayerList({
  view: mapView,
  listItemCreatedFunction: (event) => {
    // Customize layer list items if needed
    const item = event.item;
    item.panel = {
      content: "legend",
      open: true
    };
  }
});
```

### 6.3 MCP Layer Control Tools

#### 6.3.1 `layer_set_visibility`

```typescript
interface LayerSetVisibilityInput {
  layerId: string;           // Layer ID from Web Map
  visible: boolean;
}

// Example: "Show me the flood zones"
layer_set_visibility({ layerId: 'FEMA_Flood_Zones_1234', visible: true })
```

#### 6.3.2 `layer_set_opacity`

```typescript
interface LayerSetOpacityInput {
  layerId: string;
  opacity: number;  // 0-1
}
```

#### 6.3.3 `layer_set_filter`

```typescript
interface LayerSetFilterInput {
  layerId: string;
  where: string;  // SQL WHERE clause
}

// Example: "Only show residential zoning"
layer_set_filter({ layerId: 'County_Zoning', where: "ZONING LIKE 'R-%'" })
```

#### 6.3.4 `layer_list`

```typescript
interface LayerListOutput {
  layers: {
    id: string;
    title: string;
    visible: boolean;
    opacity: number;
    type: string;
  }[];
}
```

### 6.4 Web Map Switching

Instead of individual layer toggles, switch entire map configurations:

```typescript
// MCP tool implementation
async function switchWebMap(preset: string) {
  const webMapIds = {
    base: 'abc123...',
    hazards: 'def456...',
    zoning: 'ghi789...',
  };

  const webMap = new WebMap({
    portalItem: { id: webMapIds[preset] }
  });

  await mapView.map = webMap;
}
```

---

## 7. Drawing & Annotation Tools

### 7.1 ESRI Sketch Widget

```typescript
const sketch = new Sketch({
  view: mapView,
  layer: graphicsLayer,
  creationMode: "single",
  availableCreateTools: ["point", "polyline", "polygon", "rectangle", "circle"],
  defaultCreateOptions: {
    mode: "click"  // or "freehand"
  }
});

// Listen for drawing completion
sketch.on("create", (event) => {
  if (event.state === "complete") {
    const graphic = event.graphic;
    // Store in Zustand, emit to MCP
  }
});
```

### 7.2 ESRI Measurement Widget

```typescript
const measurement = new Measurement({
  view: mapView,
  activeTool: "distance"  // or "area"
});
```

### 7.3 MCP Drawing Tools

#### 7.3.1 `draw_create`

```typescript
interface DrawCreateInput {
  type: 'point' | 'line' | 'polygon' | 'circle' | 'rectangle';
  geometry?: __esri.Geometry;  // If provided, create directly
  style?: {
    color?: string;
    fillOpacity?: number;
    strokeWidth?: number;
  };
  name?: string;
}

// Example: Agent draws a buffer
draw_create({
  type: 'circle',
  geometry: {
    type: 'point',
    longitude: -122.04,
    latitude: 38.25,
    // Circle will be generated with radius
  },
  name: '300ft Notification Buffer'
})
```

#### 7.3.2 `draw_enable_mode`

```typescript
interface DrawEnableModeInput {
  mode: 'point' | 'line' | 'polygon' | 'rectangle' | 'circle';
  instructions?: string;
}

// Example: "Please draw the area you're interested in"
draw_enable_mode({
  mode: 'polygon',
  instructions: 'Click to add points, double-click to finish'
})
```

#### 7.3.3 `draw_measure`

```typescript
interface DrawMeasureOutput {
  drawingId: string;
  type: string;
  measurements: {
    area?: { squareFeet: number; acres: number };
    length?: { feet: number; miles: number };
    perimeter?: { feet: number };
  };
}
```

---

## 8. Spatial Analysis

### 8.1 Client-Side Analysis (Free)

Using ESRI Geometry Engine (runs in browser, no credits):

```typescript
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";

// Buffer
const buffer = geometryEngine.buffer(point, 300, "feet");

// Intersect
const intersection = geometryEngine.intersect(polygon1, polygon2);

// Contains
const contains = geometryEngine.contains(polygon, point);

// Area/Length
const area = geometryEngine.geodesicArea(polygon, "acres");
const length = geometryEngine.geodesicLength(polyline, "feet");
```

### 8.2 Server-Side Analysis (Credits)

For complex operations, use Geometry Service:

```typescript
import GeometryService from "@arcgis/core/tasks/GeometryService";
import BufferParameters from "@arcgis/core/tasks/support/BufferParameters";

const geometryService = new GeometryService({
  url: "https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
});

// Server-side buffer (when client-side isn't sufficient)
const params = new BufferParameters({
  geometries: [point],
  distances: [300],
  unit: "feet",
  geodesic: true
});

const results = await geometryService.buffer(params);
```

### 8.3 MCP Analysis Tools

#### 8.3.1 `analyze_buffer`

```typescript
interface AnalyzeBufferInput {
  source: { apn: string } | { coordinates: [number, number] } | { drawingId: string };
  distance: number;
  unit: 'feet' | 'meters' | 'miles';
  returnParcels?: boolean;
  addAsLayer?: boolean;
}

interface AnalyzeBufferOutput {
  bufferGeometry: __esri.Polygon;
  area: { acres: number; squareFeet: number };
  parcels?: ParcelInfo[];
  layerId?: string;
}
```

#### 8.3.2 `analyze_intersection`

```typescript
interface AnalyzeIntersectionInput {
  area: { drawingId: string } | { geometry: object };
  layers: string[];  // Layer IDs to query
  returnStatistics?: boolean;
}

interface AnalyzeIntersectionOutput {
  results: {
    layerId: string;
    features: __esri.Graphic[];
    statistics?: {
      count: number;
      totalArea?: number;
      breakdown?: Record<string, number>;
    };
  }[];
}
```

#### 8.3.3 `analyze_site_selection`

```typescript
interface AnalyzeSiteSelectionInput {
  criteria: {
    minAcres?: number;
    maxAcres?: number;
    zoning?: string[];
    notInFloodZone?: boolean;
    notInFireZone?: boolean;
  };
  searchArea?: 'countywide' | { geometry: object };
  limit?: number;
  addAsLayer?: boolean;
}

interface AnalyzeSiteSelectionOutput {
  parcels: ParcelInfo[];
  totalCount: number;
  summary: {
    totalAcres: number;
    byZoning: Record<string, number>;
  };
}
```

---

## 9. Agent Integration

### 9.1 Shared State (No WebSocket Needed)

Since the map component and MCP tools run in the same Next.js app, we use a shared Zustand store:

```typescript
// lib/stores/mapStore.ts
import { create } from 'zustand';

interface MapStore {
  // Map instance reference
  mapView: __esri.MapView | null;
  setMapView: (view: __esri.MapView) => void;

  // State
  webMapId: string;
  setWebMapId: (id: string) => void;

  visibleLayers: string[];
  setLayerVisibility: (layerId: string, visible: boolean) => void;

  drawings: __esri.Graphic[];
  addDrawing: (graphic: __esri.Graphic) => void;
  removeDrawing: (id: string) => void;

  selectedFeatures: __esri.Graphic[];
  setSelectedFeatures: (features: __esri.Graphic[]) => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  // Implementation
}));
```

### 9.2 MCP Tool → Map Communication

```typescript
// In MCP tool handler
import { useMapStore } from '@/lib/stores/mapStore';

server.tool('layer_set_visibility', async ({ layerId, visible }) => {
  const store = useMapStore.getState();
  const mapView = store.mapView;

  if (!mapView) {
    return { error: 'Map not initialized' };
  }

  const layer = mapView.map.findLayerById(layerId);
  if (layer) {
    layer.visible = visible;
    store.setLayerVisibility(layerId, visible);
  }

  return { success: true };
});
```

### 9.3 Map Events → Agent

```typescript
// In MapContainer component
useEffect(() => {
  if (!mapView) return;

  // Feature click
  mapView.on("click", async (event) => {
    const response = await mapView.hitTest(event);
    if (response.results.length > 0) {
      const graphic = response.results[0].graphic;
      // Update store, agent can read this state
      useMapStore.getState().setSelectedFeatures([graphic]);
    }
  });

  // View change
  mapView.watch("extent", (extent) => {
    // Update store with new view state
  });
}, [mapView]);
```

### 9.4 Natural Language Intent Mapping

| User Says | Agent Action |
|-----------|--------------|
| "Show me 123 Main St" | `geocode_address` → `map_set_view` |
| "Zoom out" | `map_set_view({ zoom: currentZoom - 2 })` |
| "What's the flood risk here?" | `map_load_webmap({ preset: 'hazards' })` |
| "Switch to aerial" | Use BasemapGallery or direct basemap change |
| "Draw a 500ft buffer around this parcel" | `draw_create({ type: 'circle', ... })` |
| "Find agricultural parcels over 10 acres" | `analyze_site_selection(...)` |
| "Print this map" | Trigger Print widget |

---

## 10. Data Layer Catalog

### 10.1 Solano County ArcGIS Services

**Base URL:** `https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services`

| Service | Layer ID | Key Fields | Notes |
|---------|----------|------------|-------|
| Address_Points | 0 | fulladdress, apn, lat, long | Geocoding |
| Parcels_Public_Aumentum | 0 | parcelid, p_address, acres, valland, valimp | Property data |
| SolanoCountyZoning_092322 | 4 | ZONING, LABEL | Unincorporated |
| City_of_Fairfield_Zoning | 3 | ZONING | Fairfield only |
| City_of_Vacaville_Zoning | 0 | Zone_Class | Vacaville only |
| Vallejo_Zoning | 0 | ZONE_CODE | Vallejo only |
| BOS_District_Boundaries_2021 | 0 | DISTRICT, SUP_NAME | Supervisor districts |
| Water_Districts | 0 | DISTRICT | Water service |
| Fire_Stations | 0 | NAME | Fire stations |
| Schools | 0 | NAME, DISTRICT | Schools |
| ParksInSolanoCounty | 0 | NAME | Parks |
| City_Boundaries | 0 | NAME | Incorporated cities |

### 10.2 State/Federal Services

| Service | URL | Purpose |
|---------|-----|---------|
| FEMA NFHL | `https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer` | Flood zones |
| CAL FIRE FHSZ | `https://services.gis.ca.gov/arcgis/rest/services/Environment/Fire_Severity_Zones/MapServer` | Fire hazard |
| FMMP Farmland | `https://gis.conservation.ca.gov/server/rest/services/DLRP/FMMP/MapServer` | Agricultural land |
| USFWS Wetlands | `https://fwspublicservices.wim.usgs.gov/wetlandsmapservice/rest/services/Wetlands/MapServer` | Wetlands |

### 10.3 ESRI Basemaps (Free with Attribution)

| Basemap | ID | Best For |
|---------|----|---------|
| Streets | `streets-vector` | General navigation |
| Imagery | `satellite` | Current conditions |
| Imagery with Labels | `hybrid` | Detail + context |
| Topographic | `topo-vector` | Terrain |
| Dark Gray | `dark-gray-vector` | Low-light |

---

## 11. Technical Implementation

### 11.1 Project Structure

```
app/
├── map/
│   ├── page.tsx                 # Map page route
│   └── layout.tsx               # Map-specific layout
├── components/
│   ├── map/
│   │   ├── MapContainer.tsx     # Main map wrapper
│   │   ├── MapWidgets.tsx       # ESRI widget configuration
│   │   └── MapEventHandlers.tsx # Click/select handlers
│   └── ui/
│       └── MapSidebar.tsx       # Layer panel container
├── lib/
│   ├── stores/
│   │   └── mapStore.ts          # Zustand store
│   ├── esri/
│   │   ├── webmaps.ts           # Web Map ID registry
│   │   ├── config.ts            # ESRI configuration
│   │   └── utils.ts             # Helper functions
│   └── tools/
│       ├── map-control.ts       # map_* MCP tools
│       ├── layer-control.ts     # layer_* MCP tools
│       ├── drawing.ts           # draw_* MCP tools
│       └── analysis.ts          # analyze_* MCP tools
```

### 11.2 ESRI SDK Integration

```typescript
// next.config.ts
const nextConfig = {
  transpilePackages: ['@arcgis/core'],
  // ... other config
};

// app/layout.tsx or map/layout.tsx
import "@arcgis/core/assets/esri/themes/light/main.css";
```

### 11.3 MapContainer Component

```typescript
// app/components/map/MapContainer.tsx
"use client";

import { useEffect, useRef } from 'react';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import { useMapStore } from '@/lib/stores/mapStore';

interface MapContainerProps {
  webMapId: string;
}

export function MapContainer({ webMapId }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { setMapView } = useMapStore();

  useEffect(() => {
    if (!mapRef.current) return;

    const webMap = new WebMap({
      portalItem: { id: webMapId }
    });

    const view = new MapView({
      container: mapRef.current,
      map: webMap,
    });

    view.when(() => {
      setMapView(view);
      // Add widgets here
    });

    return () => {
      view.destroy();
    };
  }, [webMapId]);

  return <div ref={mapRef} className="w-full h-full" />;
}
```

### 11.4 MCP Tool Registration

```typescript
// lib/tools/map-control.ts
import { z } from 'zod';
import { useMapStore } from '@/lib/stores/mapStore';

export const mapSetViewTool = {
  name: 'map_set_view',
  description: 'Set the map view center, zoom, or extent',
  schema: z.object({
    center: z.object({
      longitude: z.number(),
      latitude: z.number()
    }).optional(),
    zoom: z.number().min(1).max(22).optional(),
    animate: z.boolean().optional().default(true)
  }),
  handler: async (params) => {
    const { mapView } = useMapStore.getState();

    if (!mapView) {
      return { error: 'Map not initialized. Open /map first.' };
    }

    if (params.center) {
      await mapView.goTo({
        center: [params.center.longitude, params.center.latitude],
        zoom: params.zoom
      }, { animate: params.animate });
    } else if (params.zoom) {
      await mapView.goTo({ zoom: params.zoom }, { animate: params.animate });
    }

    return {
      success: true,
      view: {
        center: mapView.center.toJSON(),
        zoom: mapView.zoom
      }
    };
  }
};
```

---

## 12. Migration Strategy

### 12.1 Phase 1: Foundation (Parallel Work)

**Goal:** Interactive map loads and displays parcels

**Ryan (ESRI):**
- [ ] Create sage-base Web Map
- [ ] Add parcels, boundaries
- [ ] Configure popups
- [ ] Share publicly, get ID

**Claude (Code):**
- [ ] Install @arcgis/core
- [ ] Create MapContainer
- [ ] Create /map route
- [ ] Load Web Map by ID

**Checkpoint:** Map displays with parcels, pan/zoom works

### 12.2 Phase 2: Layers (Parallel Work)

**Goal:** Full layer system with presets

**Ryan (ESRI):**
- [ ] Create sage-hazards, sage-zoning maps
- [ ] Configure all layers
- [ ] Set symbology

**Claude (Code):**
- [ ] Add LayerList widget
- [ ] Implement layer MCP tools
- [ ] Add map preset switcher

**Checkpoint:** Can switch between hazard/zoning/base views

### 12.3 Phase 3: Drawing & Analysis

**Goal:** Full interactivity

**Claude (Code):**
- [ ] Add Sketch widget
- [ ] Add Measurement widget
- [ ] Implement analysis tools
- [ ] Add Print widget

**Checkpoint:** Full feature parity with spec

### 12.4 Phase 4: Polish

**Goal:** Production ready

- [ ] Deprecate render_map
- [ ] Mobile responsive
- [ ] Error handling
- [ ] Documentation

### 12.5 Backward Compatibility

During migration, render_map continues to work:

```typescript
server.tool('render_map', async (params) => {
  // Check if interactive map is available
  const { mapView } = useMapStore.getState();

  if (mapView) {
    // Use interactive map
    await mapView.goTo({ center: params.center, zoom: params.zoom });
    if (params.apn) {
      // Highlight parcel
    }
    return {
      content: [{ type: 'text', text: 'Map updated in interactive viewer at /map' }]
    };
  }

  // Fall back to static rendering
  return await renderStaticMap(params);
});
```

---

## 13. Success Metrics

### 13.1 Performance Targets

| Metric | Target |
|--------|--------|
| Map load time | < 3 seconds |
| Parcel click to popup | < 500ms |
| Layer toggle | < 200ms |
| Drawing completion | < 100ms |
| Buffer analysis | < 1 second |

### 13.2 Code Reduction

| File | Before | After |
|------|--------|-------|
| render-map.ts | 43,555 lines | 0 (deprecated) |
| Layer configs | ~500 lines | 0 (in AGOL) |
| Symbology | ~300 lines | 0 (in AGOL) |
| **Total savings** | ~44,000 lines | **New: ~1,500 lines** |

### 13.3 Feature Coverage

| Capability | Before | After |
|------------|--------|-------|
| Pan/zoom | ❌ | ✅ |
| Click identify | ❌ | ✅ |
| Layer toggle | ❌ | ✅ |
| Drawing | ❌ | ✅ |
| Measurement | ❌ | ✅ |
| Buffer analysis | ✅ (static) | ✅ (interactive) |
| Print/export | ❌ | ✅ |
| Mobile support | ❌ | ✅ |

---

## Appendix A: Complete MCP Tool Reference

### A.1 Map Control Tools

| Tool | Input | Description |
|------|-------|-------------|
| `map_load_webmap` | webMapId?, preset? | Load a Web Map by ID or preset |
| `map_set_view` | center?, zoom?, extent?, animate? | Set map viewport |
| `map_get_state` | - | Get current map state |
| `map_fit_features` | apns?, layerId?, padding? | Fit to features |
| `map_screenshot` | format?, width?, height? | Capture current view |

### A.2 Layer Control Tools

| Tool | Input | Description |
|------|-------|-------------|
| `layer_set_visibility` | layerId, visible | Show/hide layer |
| `layer_set_opacity` | layerId, opacity | Set transparency |
| `layer_set_filter` | layerId, where | Filter features |
| `layer_list` | - | List all layers |

### A.3 Drawing Tools

| Tool | Input | Description |
|------|-------|-------------|
| `draw_create` | type, geometry?, style?, name? | Create drawing |
| `draw_enable_mode` | mode, instructions? | Enable drawing mode |
| `draw_list` | - | List drawings |
| `draw_delete` | drawingId | Delete drawing |
| `draw_measure` | drawingId | Get measurements |

### A.4 Analysis Tools

| Tool | Input | Description |
|------|-------|-------------|
| `analyze_buffer` | source, distance, unit, returnParcels? | Buffer analysis |
| `analyze_intersection` | area, layers, returnStatistics? | Intersection analysis |
| `analyze_site_selection` | criteria, searchArea?, limit? | Multi-criteria search |

---

## Appendix B: ESRI Quick Reference

### B.1 Common ESRI Imports

```typescript
// Map and View
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';

// Widgets
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Sketch from '@arcgis/core/widgets/Sketch';
import Measurement from '@arcgis/core/widgets/Measurement';
import Print from '@arcgis/core/widgets/Print';

// Geometry
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import Point from '@arcgis/core/geometry/Point';
import Polygon from '@arcgis/core/geometry/Polygon';

// Graphics
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

// Query
import Query from '@arcgis/core/rest/support/Query';
import * as query from '@arcgis/core/rest/query';
```

### B.2 Useful ESRI Patterns

```typescript
// Load Web Map
const webMap = new WebMap({ portalItem: { id: 'YOUR_ID' } });
const view = new MapView({ container: 'mapDiv', map: webMap });

// Add widget
view.ui.add(new LayerList({ view }), 'top-right');

// Query layer
const results = await layer.queryFeatures({
  where: "ZONING = 'A-40'",
  outFields: ['*'],
  returnGeometry: true
});

// Client-side buffer (free)
const buffer = geometryEngine.buffer(point, 300, 'feet');

// Go to location
await view.goTo({ center: [-122.04, 38.25], zoom: 17 });
```

---

*End of Specification v2.0*
