# PointCloudRenderer

**Module:** `@arcgis/core/renderers/PointCloudRenderer`

## Import

```javascript
import PointCloudRenderer from "@arcgis/core/renderers/PointCloudRenderer.js";
```

```javascript
// CDN
const PointCloudRenderer = await $arcgis.import("@arcgis/core/renderers/PointCloudRenderer.js");
```

**Since:** 4.2

## See Also

- Sample - PointCloudLayer
- Sample - PointCloudLayer with renderer
- Sample: PointCloudLayer - intensity color modulation

## Property Details

### `PointCloudRenderer`

### `colorModulation`

### `declaredClass`
- **Type:** `Inherited`

### `pointSizeAlgorithm`

### `pointsPerInch`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `PointSizeFixedSizeAlgorithm`

### `PointSizeSplatAlgorithm`


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

