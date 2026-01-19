# WebDocument2D

**Module:** `@arcgis/core/WebDocument2D`

## Import

```javascript
import WebDocument2D from "@arcgis/core/WebDocument2D.js";
```

```javascript
// CDN
const WebDocument2D = await $arcgis.import("@arcgis/core/WebDocument2D.js");
```

**Since:** 4.31

## See Also

- WebMap
- WebLinkChart
- Editor
- Sample - Edit features with the Editor widget
- Sample - Editor widget with configurations
- ElevationLayer
- Ground
- Sample - Creating a FeatureLayer - Add an array of client-side features
- FeatureLayer.isTable
- Sample - Save a web map
- layer collection's push() method
- layer collection's push() method
- Map.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- Layer.destroy()
- PortalItem.destroy()
- portalItem
- load
- updateFrom
- updateFrom
- save
- saveAs

## Property Details

### `allLayers`
- **Type:** `Inherited`

### `allTables`
- **Type:** `Inherited`

### `applicationProperties`

### `authoringApp`

### `authoringAppVersion`

### `basemap`
- **Type:** `Inherited`

### `bookmarks`

### `declaredClass`
- **Type:** `Inherited`

### `editableLayers`
- **Type:** `Inherited`

### `floorInfo`

### `ground`
- **Type:** `Inherited`

### `initialViewProperties`

### `layers`
- **Type:** `Inherited`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `portalItem`

### `tables`
- **Type:** `Inherited`

### `thumbnailUrl`

### `widgets`

### `add`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `addMany`
- **Type:** `Inherited`

### `cancelLoad`

### `destroy`

### `findLayerById`
- **Type:** `Inherited`

### `findTableById`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `loadAll`

### `remove`
- **Type:** `Inherited`

### `removeAll`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `removeMany`
- **Type:** `Inherited`

### `reorder`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `updateFrom`

### `when`


## Method Details

### `Method Details()`


## Examples

```javascript
// Find a layer with title "US Counties"
const foundLayer = map.allLayers.find(function(layer) {
 return layer.title === "US Counties";
});

// Create a filtered collection of the non-group layers
const nonGroupLayers = map.allLayers.filter(function(layer) {
 return !foundLayer.layers;
});

// Listen for any layer being added or removed in the Map
map.allLayers.on("change", function(event) {
 console.log("Layer added: ", event.added);
 console.log("Layer removed: ", event.removed);
 console.log("Layer moved: ", event.moved);
});

// Watching for changes to the visible layers in the Map
reactiveUtils.watch(
  () => view.map.allLayers.filter((layer) => layer.visible),
  (newVisibleLayers, oldVisibleLayers) => {
    const added = newVisibleLayers.filter(
      (layer) => !oldVisibleLayers.includes(layer)
    );
    const removed = oldVisibleLayers.filter(
      (layer) => !newVisibleLayers.includes(layer)
    );
    added.forEach((layer) => console.log(layer.title, "is visible"));
    removed.forEach((layer) => console.log(layer.title, "is not visible"));
  }
);
```

```javascript
// A feature layer where isTable = true.
const foundTable = map.allTables.find(function(table) {
  // Find a table with title "US Counties"
  return table.title === "US Counties";
});
```

```javascript
// create the basemap from a string id representing the basemap style
const map = new Map({
  basemap: "arcgis/topographic"
});

// create the basemap from a BasemapStyle object
const map = new Map({
 basemap: {
  style: {
   id:  "arcgis/outdoor",
   language: "es" // place labels will be displayed in spanish
  }
 }
});
```

```javascript
// Set the basemap from a string ID in the constructor
const map = new Map({
  basemap: "dark-gray-3d"
});

// Set the basemap after the map instance is created
map.basemap = "topo-3d";
```

```javascript
// Create a VectorTileLayer from a style URL
const mapBaseLayer = new VectorTileLayer({
  url: "https://arcgis.com/sharing/rest/content/items/b5676525747f499687f12746441101ef/resources/styles/root.json"
});

// Create a Basemap with the VectorTileLayer
const customBasemap = new Basemap({
  baseLayers: [mapBaseLayer],
  title: "Terrain"
});

// Set the basemap to the customBasemap
const map = new Map({
  basemap: customBasemap
});
```

```javascript
// Use the world elevation service
const map = new Map({
  basemap: "topo-vector",
  ground: "world-elevation"
});
```

