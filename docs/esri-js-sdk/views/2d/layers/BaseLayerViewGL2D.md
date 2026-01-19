# BaseLayerViewGL2D

**Module:** `@arcgis/core/views/2d/layers/BaseLayerViewGL2D`

## Import

```javascript
import BaseLayerViewGL2D from "@arcgis/core/views/2d/layers/BaseLayerViewGL2D.js";
```

```javascript
// CDN
const BaseLayerViewGL2D = await $arcgis.import("@arcgis/core/views/2d/layers/BaseLayerViewGL2D.js");
```

**Since:** 4.11

## See Also

- Sample - Tutorial: animated markers
- Sample - Tessellation helpers
- Sample - Animated lines
- Sample - Tiling support
- Sample - Using deck.gl
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

### `BaseLayerViewGL2D`

### `context`

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

### `bindRenderTarget`

### `detach`

### `getRenderTarget`

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

### `tessellateExtent`

### `tessellateMultipoint`

### `tessellatePoint`

### `tessellatePolygon`

### `tessellatePolyline`

### `tilesChanged`

### `when`
- **Type:** `Inherited`

### `MeshVertex`

### `Rect`

### `RenderTarget`

### `ScreenPoint`

### `TessellatedMesh`

### `Tile`


## Method Details

### `Method Details()`


## Examples

```javascript
let CustomLayerView2D = BaseLayerViewGL2D.createSubclass({
   render(renderParameters) {
     const gl = this.context;

     ...
   }

   attach() {
     const gl = this.context;

     ...
   }

   detach() {
     const gl = this.context;

     ...
   }
 });

 let CustomTileLayer = Layer.createSubclass({
   tileInfo: TileInfo.create({ spatialReference: { wkid: 3857 }}),

   createLayerView(view) {
     if (view.type === "2d") {
       return new CustomLayerView2D({
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
// Create a shader program and a property watcher
attach() {
  let gl = this.context;

  this._shaderProgram = gl.createProgram();
  ...

  this._propertyHandle = reactiveUtils.watch(
    () => this.layer.opacity,
    () => this.requestRender()
  );
}
```

```javascript
render() {
  let gl = this.context;

  ...

  // Bind a temporary offscreen surface
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.myOffscreenSurface);

  ...

  // Render to the offscreen surface

  ...

  // Bind the original render surface so that the image stored
  // into the temporary one can be blitted/composited with the
  // actual frame data
  this.bindRenderTarget();

  ...

  // Your own frame composition logic

  ...
}
```

```javascript
// Remove the watchers and destroy the shader program created in attach()
detach() {
  this._propertyHandle.remove();
  this._propertyHandle = null;

  const gl = this.context;

  gl.deleteProgram(this._shaderProgram);
  this._shaderProgram = null;
}
```

