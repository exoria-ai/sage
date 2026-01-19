# Layer

**Module:** `@arcgis/core/layers/Layer`

## Import

```javascript
import Layer from "@arcgis/core/layers/Layer.js";
```

```javascript
// CDN
const Layer = await $arcgis.import("@arcgis/core/layers/Layer.js");
```

**Since:** 4.0

## See Also

- Intro to layers
- FeatureLayer
- MapImageLayer
- TileLayer
- SceneLayer
- ElevationLayer
- KnowledgeGraphLayer
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- isTable
- isLayer
- isTable
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `fullExtent`

### `id`

### `listMode`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `opacity`

### `parent`

### `persistenceEnabled`

### `title`

### `type`

### `uid`

### `visibilityTimeExtent`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `createLayerView`

### `destroy`

### `emit`

### `fetchAttributionData`

### `fromArcGISServerUrl`

### `fromPortalItem`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `on`

### `removeHandles`
- **Type:** `Inherited`

### `when`


## Method Details

### `Method Details()`


## Examples

```javascript
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

```javascript
// Makes the layer 50% transparent
layer.opacity = 0.5;
```

```javascript
// The layer is no longer visible in the view
layer.visible = false;

// Watch for changes in the layer's visibility
// and set the visibility of another layer when it changes
reactiveUtils.watch(
  () => layer.visible,
  (visible) => {
    if (visible) {
      anotherLayer.visible = true;
    } else {
      anotherLayer.visible = false;
    }
  }
);
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

```javascript
// This snippet shows how to add a feature layer from an ArcGIS Server URL
// Get an ArcGIS Server URL from a custom function
const arcgisUrl = getLayerUrl();

Layer.fromArcGISServerUrl({
  url: arcgisUrl,
  properties: {
    // set any layer properties here
    popupTemplate: new PopupTemplate()
  }
}).then(function(layer){
  // add the layer to the map
  map.add(layer);
});
```

```javascript
// This snippet shows how to add a table from an ArcGIS Server URL
// Get an ArcGIS Server URL from a custom function
const arcgisUrl = getLayerUrl();

Layer.fromArcGISServerUrl({
  url: arcgisUrl
}).then(function(layer){
  // Load the table before it can be used
  layer.load().then(function() {
    // Check that it is the right type
    if (layer.isTable) {
      // Add table to map's tables collection
      map.tables.add(layer);
    }
  });
});
```

