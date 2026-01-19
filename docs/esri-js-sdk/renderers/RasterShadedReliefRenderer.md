# RasterShadedReliefRenderer

**Module:** `@arcgis/core/renderers/RasterShadedReliefRenderer`

## Import

```javascript
import RasterShadedReliefRenderer from "@arcgis/core/renderers/RasterShadedReliefRenderer.js";
```

```javascript
// CDN
const RasterShadedReliefRenderer = await $arcgis.import("@arcgis/core/renderers/RasterShadedReliefRenderer.js");
```

**Since:** 4.16

## See Also

- Hillshade function
- Shaded relief function

## Property Details

### `RasterShadedReliefRenderer`

### `altitude`

### `azimuth`

### `colorRamp`

### `declaredClass`
- **Type:** `Inherited`

### `hillshadeType`

### `pixelSizeFactor`

### `pixelSizePower`

### `scalingType`

### `type`

### `zFactor`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

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
// Creates a deep clone of the first layer's renderer
let renderer = view.map.layers.at(0).renderer.clone();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

