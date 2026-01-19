# BaseElevationLayer

**Module:** `@arcgis/core/layers/BaseElevationLayer`

## Import

```javascript
import BaseElevationLayer from "@arcgis/core/layers/BaseElevationLayer.js";
```

```javascript
// CDN
const BaseElevationLayer = await $arcgis.import("@arcgis/core/layers/BaseElevationLayer.js");
```

**Since:** 4.4

## See Also

- Creating Custom Elevation Layers (slides) - 2017 Esri Dev Summit
- Creating Custom Layers and LayerViews (video)
- Sample - Custom ElevationLayer: Exaggerating elevation
- Sample - Custom ElevationLayer: Thematic data as elevation
- Tiled Elevation Service documentation
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- Creating custom layers (slides) - 2017 Esri Dev Summit
- Sample - Custom ElevationLayer: Thematic data as elevation
- ElevationLayer.queryElevation
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `listMode`
- **Type:** `Inherited`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`
- **Type:** `Inherited`

### `spatialReference`

### `tileInfo`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `addResolvingPromise`

### `cancelLoad`
- **Type:** `Inherited`

### `createElevationSampler`

### `createLayerView`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `fetchTile`

### `getTileBounds`

### `hasEventListener`
- **Type:** `Inherited`

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

### `on`
- **Type:** `Inherited`

### `queryElevation`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `ElevationTileData`


## Method Details

### `Method Details()`


## Examples

```javascript
const ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({
  load: function() {
    // add loadable dependencies here and include
    // their returned promises in the
    // addResolvingPromise() method
    this._elevation = new ElevationLayer({
      url: "//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
    });
    this.addResolvingPromise(this._elevation.load());
  },

  fetchTile: function(level, row, col, options) {
    // must resolve to an object with the following properties:
    // values <number[]>: an array of elevation values for each pixel
    // width <number>: the width of the tile in pixels
    // height <number>: the height of the tile in pixels
    // noDataValue <number>: value of pixels where no elevation data is present
    return this._elevation.fetchTile(level, row, col, options).then(function(data) {
      let exaggeration = this.exaggeration;
      // `data` is an object that contains the width of the tile in pixels,
      // the height of the tile in pixels, and the values of each pixel
      for (let i = 0; i < data.values.length; i++) {
         // each value represents an elevation sample for the
         // given pixel position in the tile
         // check if the value is a no data value
         if (data.values[i] !== data.noDataValue) {
           // multiply the elevation value by the exaggeration value
           data.values[i] *= exaggeration;
         }
      }
      return data;
    }.bind(this))
  }
});
```

```javascript
let map = new Map({
  basemap: "satellite",
  ground: {
    layers: [ new ExaggeratedElevationLayer() ]
  }
});
sceneView.map = map;
```

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

