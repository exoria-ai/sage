# BaseTileLayer

**Module:** `@arcgis/core/layers/BaseTileLayer`

## Import

```javascript
import BaseTileLayer from "@arcgis/core/layers/BaseTileLayer.js";
```

```javascript
// CDN
const BaseTileLayer = await $arcgis.import("@arcgis/core/layers/BaseTileLayer.js");
```

**Since:** 4.4

## See Also

- Creating Custom Layers and LayerViews (slides) - 2017 Esri Dev Summit
- Creating Custom Layers and LayerViews (video)
- Sample - Custom TileLayer
- Sample - Custom LERC Layer
- Sample - Custom BlendLayer
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- refresh()
- refresh event
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom BlendLayer
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- Sample - Custom BlendLayer
- Sample - Custom LERC Layer
- refreshInterval
- refresh event
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `blendMode`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

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

### `maxScale`

### `minScale`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`
- **Type:** `Inherited`

### `refreshInterval`

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

### `getTileUrl`

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

### `refresh`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// set the spatial reference to New Zealand Transverse Mercator
 const spatialReference = new SpatialReference({
   wkid: 2193
});

// create the origin point for the tileInfo
// The upper left corner of the tiling scheme,
const origin = new Point({
  x: -4020900,
  y: 19998100,
  spatialReference
});

// Create LODs based on the source tiles
const tileInfo = new TileInfo({
  spatialReference,
  origin: origin,
  format: "mixed",
  lods: [{
     "level": 0,
     "resolution": 156543.03392799935,
     "scale": 591657527.591552
    },
    {
       "level": 1,
       "resolution": 78271.51696399967,
       "scale": 295828763.795776
     },
     // other LODs
   ]
 });

const MyCustomTileLayer = BaseTileLayer.createSubclass({
  constructor() {
    this.tileInfo = tileInfo;
    this.spatialReference = spatialReference;
    this.fullExtent = new Extent ({
      xmin: -1497310.4689000002,
      ymin: 3678220.3271,
      xmax: 4749968.6755,
      ymax: 7192314.8459,
       spatialReference
    })
   },
   // properties of the custom tile layer
   properties: {
     urlTemplate: null,
   }
});
```

```javascript
// override getTileUrl()
// generate the tile url for a given level, row and column
getTileUrl: function (level, row, col) {
  return this.urlTemplate.replace("{z}", level).replace("{x}", col).replace("{y}", row);
}
```

```javascript
// override fetchTile() method to process the data returned
// from the server.
fetchTile: function (level, row, col, options) {
  // call getTileUrl method to construct the Url for the image
  // for given level, row and column
  let url = this.getTileUrl(level, row, col);

  // request for the tile based on the url returned from getTileUrl() method.
  // the signal option ensures that obsolete requests are aborted.
  return esriRequest(url, {
    responseType: "image",
    signal: options && options.signal
  })
  .then(function (response) {
    // when esriRequest resolves successfully,
    // process the image that is returned
    let image = response.data;
    let width = this.tileInfo.size[0];
    let height = this.tileInfo.size[0];

    // create a canvas with a filled rectangle
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    // Apply the color provided by the layer to the fill rectangle
    if (this.tint) {
      context.fillStyle = this.tint.toCss();
      context.fillRect(0, 0, width, height);
      // apply multiply blend mode to canvas' fill color and the tile
      // returned from the server to darken the tile
      context.globalCompositeOperation = "multiply";
    }
    context.drawImage(image, 0, 0, width, height);
    return canvas;
  }.bind(this));
}
```

```javascript
// Override load method
load: function () {
 // multiply property is an array of ArcGIS cached map services
 this.multiply.forEach(function (layer) {
   // loop through each tile layers and call
   // load method on each layer
   let promise = layer.load();

   // add the promise of each load() method to addResolvingPromise()
   // the custom tile layer will be loaded when every promise is resolved
   this.addResolvingPromise(promise);
 }, this);
}
```

```javascript
// the following effect will be applied to the layer at all scales
// brightness will be applied first, then hue-rotate followed by contrast
// changing order of the effects will change the final result
layer.effect = "brightness(5) hue-rotate(270deg) contrast(200%)";
```

```javascript
// set a scale dependent bloom effect on the layer
layer.effect = [
  {
    scale: 36978595,
    value: "drop-shadow(3px, 3px, 4px)"
  },
  {
    scale: 18489297,
    value: "drop-shadow(2px, 2px, 3px)"
  },
  {
    scale: 4622324,
    value: "drop-shadow(1px, 1px, 2px)"
  }
];
```

