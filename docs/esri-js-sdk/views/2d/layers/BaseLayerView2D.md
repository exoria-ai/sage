# BaseLayerView2D

**Module:** `@arcgis/core/views/2d/layers/BaseLayerView2D`

## Import

```javascript
import BaseLayerView2D from "@arcgis/core/views/2d/layers/BaseLayerView2D.js";
```

```javascript
// CDN
const BaseLayerView2D = await $arcgis.import("@arcgis/core/views/2d/layers/BaseLayerView2D.js");
```

**Since:** 4.8

## See Also

- suspended
- spatialReferenceSupported
- tilesChanged()
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended
- detach()
- attach()

## Property Details

### `BaseLayerView2D`

### `declaredClass`
- **Type:** `Inherited`

### `layer`

### `spatialReferenceSupported`
- **Type:** `Inherited`

### `suspended`
- **Type:** `Inherited`

### `tiles`

### `uid`
- **Type:** `Inherited`

### `updating`
- **Type:** `Inherited`

### `view`

### `visible`
- **Type:** `Inherited`

### `visibleAtCurrentScale`
- **Type:** `Inherited`

### `visibleAtCurrentTimeExtent`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `attach`

### `detach`

### `hasHandles`
- **Type:** `Inherited`

### `hitTest`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`

### `requestRender`

### `tilesChanged`

### `when`
- **Type:** `Inherited`

### `ScreenPoint`

### `Tile`


## Method Details

### `Method Details()`


## Examples

```javascript
let TileBorderLayerView2D = BaseLayerView2D.createSubclass({
   // Example of a render implementation that draws tile boundaries
   render(renderParameters) {
     let tileSize = this.layer.tileInfo.size[0];
     let state = renderParameters.state;
     let pixelRatio = state.pixelRatio;
     let width = state.size[0];
     let height = state.size[1];
     let context = renderParameters.context;
     let coords = [0, 0];

     context.fillStyle = "rgba(0,0,0,0.25)";
     context.fillRect(0, 0, width * pixelRatio, height * pixelRatio);

     // apply rotation for everything that will be applied to the canvas
     if (state.rotation !== 0) {
       context.translate(width * pixelRatio * 0.5, height * pixelRatio * 0.5);
       context.rotate((state.rotation * Math.PI) / 180);
       context.translate(- width * pixelRatio * 0.5, -height * pixelRatio * 0.5);
     }

     // Set the style for all the text.
     context.font = "24px monospace";
     context.fillStyle = "black";
     context.shadowBlur = 1;

     for (const tile of this.tiles) {
       let screenScale = tile.resolution / state.resolution * pixelRatio;

       state.toScreenNoRotation(coords, tile.coords);

       // Draw the tile boundaries
       context.strokeRect(coords[0], coords[1], tileSize * screenScale, tileSize * screenScale);

       // Draw the tile information
       context.shadowColor = "white";
       context.fillText(
         tile.level + "/" + tile.row + "/" + tile.col + "/" + tile.world,
         coords[0] + 12,
         coords[1] + 24,
         tileSize * screenScale
       );
       context.shadowColor = "transparent";
     }
   }
 });

 let CustomTileLayer = Layer.createSubclass({
   tileInfo: TileInfo.create({ spatialReference: { wkid: 3857 }}),

   createLayerView(view) {
     if (view.type === "2d") {
       return new TileBorderLayerView2D({
         view: view,
         layer: this
       });
     }
   }
 });
```

```javascript
// Check for the first time layerView.updating becomes false. Then query for
// features that are visible within the view associated with the layer view.
await reactiveUtils.whenOnce(() => !layerView.updating);
const query = layerView.createQuery();
query.geometry = layerView.view.extent;
const result = layerView.queryFeatures(query);
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
attach() {
  this._propertyHandle = reactiveUtils.watch(
    () => this.layer.opacity,
    () => this.requestRender()
  );
}
```

```javascript
// remove the watchers on the layer that are added in attach()
detach() {
  this._propertyHandle.remove();
  this._propertyHandle = null;
}
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

