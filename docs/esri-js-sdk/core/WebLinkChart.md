# WebLinkChart

**Module:** `@arcgis/core/WebLinkChart`

## Import

```javascript
import WebLinkChart from "@arcgis/core/WebLinkChart.js";
```

```javascript
// CDN
const WebLinkChart = await $arcgis.import("@arcgis/core/WebLinkChart.js");
```

**Since:** 4.31

## See Also

- LinkChartView
- LinkChartLayer
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

### `WebLinkChart`

### `activeLinkChartLayer`

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

### `diagramNodesExtent`

### `editableLayers`
- **Type:** `Inherited`

### `entityCount`

### `floorInfo`
- **Type:** `Inherited`

### `ground`
- **Type:** `Inherited`

### `initialViewProperties`
- **Type:** `Inherited`

### `knowledgeGraph`

### `layers`
- **Type:** `Inherited`

### `linkChartProperties`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `mapType`

### `portalItem`
- **Type:** `Inherited`

### `relationshipCount`

### `tables`
- **Type:** `Inherited`

### `thumbnailUrl`
- **Type:** `Inherited`

### `widgets`
- **Type:** `Inherited`

### `add`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `addMany`
- **Type:** `Inherited`

### `addRecords`

### `applyLayout`

### `cancelLoad`
- **Type:** `Inherited`

### `changeNonspatialDataDisplay`

### `connectBetweenEntities`

### `connectFromEntities`

### `createSublayerForNamedType`

### `destroy`
- **Type:** `Inherited`

### `expand`

### `findLayerById`
- **Type:** `Inherited`

### `findTableById`
- **Type:** `Inherited`

### `getMemberIdsByType`

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

### `refreshLinkChartData`

### `remove`
- **Type:** `Inherited`

### `removeAll`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `removeMany`
- **Type:** `Inherited`

### `removeRecords`

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

### `GeneralOptions`


## Method Details

### `Method Details()`


## Examples

```javascript
// Load the WebLinkChart and LinkChartView modules
const [LinkChart, LinkChartView, LinkChartLayer] = await $arcgis.import([
  "@arcgis/core/WebLinkChart".js,
  "@arcgis/core/views/LinkChartView.js",
  "@arcgis/core/layers/LinkChartLayer.js"
]);
// Create a WebLinkChart instance
const myLinkChart = new WebLinkChart({
  portalItem: { // autocasts as new PortalItem()
    id: "e691172598f04ea8881cd2a4adaa45ba"
  }
});
// Create a LinkChartView instance and reference the WebLinkChart instance
const view = new LinkChartView({
  map: myLinkChart,
  container: 'viewDiv'
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

