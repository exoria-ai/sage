# WebMap

**Module:** `@arcgis/core/WebMap`

## Import

```javascript
import WebMap from "@arcgis/core/WebMap.js";
```

```javascript
// CDN
const WebMap = await $arcgis.import("@arcgis/core/WebMap.js");
```

```javascript
// CDN
const [esriRequest, WebMap] = await $arcgis.import(["@arcgis/core/request.js", "@arcgis/core/WebMap.js"]);
```

**Since:** 4.0

## See Also

- Sample - Load a basic WebMap
- Sample - Load a basic WebMap and swap with another on the same View
- UnknownLayer
- UnsupportedLayer
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

### `WebMap`

### `allLayers`
- **Type:** `Inherited`

### `allTables`
- **Type:** `Inherited`

### `applicationProperties`
- **Type:** `Inherited`

### `authoringApp`
- **Type:** `Inherited`

### `authoringAppVersion`
- **Type:** `Inherited`

### `basemap`
- **Type:** `Inherited`

### `bookmarks`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `editableLayers`
- **Type:** `Inherited`

### `floorInfo`
- **Type:** `Inherited`

### `geotriggersInfo`

### `ground`
- **Type:** `Inherited`

### `initialViewProperties`
- **Type:** `Inherited`

### `ipsInfo`

### `layers`
- **Type:** `Inherited`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `portalItem`
- **Type:** `Inherited`

### `presentation`

### `sourceVersion`

### `tables`
- **Type:** `Inherited`

### `thumbnailUrl`
- **Type:** `Inherited`

### `utilityNetworks`

### `widgets`
- **Type:** `Inherited`

### `add`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `addMany`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `findLayerById`
- **Type:** `Inherited`

### `findTableById`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `load`
- **Type:** `Inherited`

### `loadAll`
- **Type:** `Inherited`

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
- **Type:** `Inherited`

### `saveAs`
- **Type:** `Inherited`

### `updateFrom`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `FloorFilter`

### `Widgets`


## Method Details

### `Method Details()`


## Examples

```javascript
const webmap = new WebMap({
  portalItem: { // autocasts as new PortalItem()
    id: "e691172598f04ea8881cd2a4adaa45ba"
  }
});
```

```javascript
esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";

const webmap = new WebMap({
  portalItem: { // autocasts as new PortalItem()
    id: "f701172599f04ea8781de2a4adzz46ab"
  }
});
```

```javascript
const view = new MapView({
  map: webmap,  // The WebMap instance created above
  container: "viewDiv"
});
```

```javascript
// Typical usage
const map = new WebMap({
  portalItem: {
    id: "e691172598f04ea8881cd2a4adaa45ba"
  }
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

