# Map

**Module:** `@arcgis/core/Map`

## Import

```javascript
import Map from "@arcgis/core/Map.js";
```

```javascript
// CDN
const Map = await $arcgis.import("@arcgis/core/Map.js");
```

```javascript
// CDN
const [Map, MapView] = await $arcgis.import(["@arcgis/core/Map.js", "@arcgis/core/views/MapView.js"]);
```

**Since:** 4.0

## See Also

- Sample - Intro to MapView
- Sample - Intro to SceneView
- MapView
- SceneView
- Editor
- Sample - Edit features with the Editor widget
- Sample - Editor widget with configurations
- FocusAreas
- Sample - Focus Area
- ElevationLayer
- Ground
- Sample - Creating a FeatureLayer - Add an array of client-side features
- FeatureLayer.isTable
- Sample - Save a web map
- layer collection's push() method
- layer collection's push() method
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- Layer.destroy()
- PortalItem.destroy()

## Property Details

### `Map`

### `allLayers`

### `allTables`

### `basemap`

### `declaredClass`
- **Type:** `Inherited`

### `editableLayers`

### `focusAreas`

### `ground`

### `layers`

### `tables`

### `add`

### `addHandles`
- **Type:** `Inherited`

### `addMany`

### `destroy`

### `findLayerById`

### `findTableById`

### `hasHandles`
- **Type:** `Inherited`

### `remove`

### `removeAll`

### `removeHandles`
- **Type:** `Inherited`

### `removeMany`

### `reorder`


## Method Details

### `Method Details()`


## Examples

```javascript
// Load the Map and MapView modules
const [Map, MapView] = await $arcgis.import(["@arcgis/core/Map.js", "@arcgis/core/views/MapView.js"]);
// Create a Map instance
const myMap = new Map({
  basemap: "streets-vector"
});
// Create a MapView instance (for 2D viewing) and reference the map instance
const view = new MapView({
  map: myMap
});
```

```javascript
// Typical usage
const map = new Map({
  basemap: "topo-vector"
});
```

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

