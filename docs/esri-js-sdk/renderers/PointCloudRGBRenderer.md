# PointCloudRGBRenderer

**Module:** `@arcgis/core/renderers/PointCloudRGBRenderer`

## Import

```javascript
import PointCloudRGBRenderer from "@arcgis/core/renderers/PointCloudRGBRenderer.js";
```

```javascript
// CDN
const PointCloudRGBRenderer = await $arcgis.import("@arcgis/core/renderers/PointCloudRGBRenderer.js");
```

**Since:** 4.2

## See Also

- Sample - PointCloudLayer with renderer
- Sample: PointCloudLayer - intensity color modulation

## Property Details

### `PointCloudRGBRenderer`

### `colorModulation`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `field`

### `pointSizeAlgorithm`
- **Type:** `Inherited`

### `pointsPerInch`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


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

