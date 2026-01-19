# BaseDynamicLayer

**Module:** `@arcgis/core/layers/BaseDynamicLayer`

## Import

```javascript
import BaseDynamicLayer from "@arcgis/core/layers/BaseDynamicLayer.js";
```

```javascript
// CDN
const BaseDynamicLayer = await $arcgis.import("@arcgis/core/layers/BaseDynamicLayer.js");
```

**Since:** 4.4

## See Also

- Creating Custom Layers and LayerViews (slides) - 2017 Esri Dev Summit
- Creating Custom Layers and LayerViews (video)
- Sample - Custom DynamicLayer
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- refresh()
- refresh event
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- Sample - Custom DynamicLayer
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

### `fetchImage`

### `getImageUrl`

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
let MyCustomDynamicLayer = BaseDynamicLayer.createSubclass({
 // properties of the custom dynamic layer
 properties: {
   getMapUrl: null,
   getMapParameters: null
 },

 // override getImageUrl() to generate URL to the image
 getImageUrl: function (extent, width, height) {
   // generate the URL for the map image
   let urlVariables = this._prepareQuery(this.getMapParameters, extent, width, height);
   let queryString = this._joinUrlVariables(urlVariables);

   // return the URL to the generated image
   return this.getMapUrl + "?" + queryString;
 },
 ...
});
```

```javascript
// Fetches images for given extent and size
fetchImage: function (extent, width, height){
  let url = this.getImageUrl(extent, width, height);

  // request for the image  based on the generated url
  return esriRequest(url, {
    responseType: "image"
  })
  .then(function(response) {
    let image = response.data;

    // create a canvas with teal fill
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    // Apply destination-atop operation to the image returned from the server
    context.fillStyle = "rgb(0,200,200)";
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = "destination-atop";
    context.drawImage(image, 0, 0, width, height);

    return canvas;
  }.bind(this));
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

```javascript
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

```javascript
// The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
layer.maxScale = 1000;
```

