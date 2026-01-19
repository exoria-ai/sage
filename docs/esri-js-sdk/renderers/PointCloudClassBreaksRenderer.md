# PointCloudClassBreaksRenderer

**Module:** `@arcgis/core/renderers/PointCloudClassBreaksRenderer`

## Import

```javascript
import PointCloudClassBreaksRenderer from "@arcgis/core/renderers/PointCloudClassBreaksRenderer.js";
```

```javascript
// CDN
const PointCloudClassBreaksRenderer = await $arcgis.import("@arcgis/core/renderers/PointCloudClassBreaksRenderer.js");
```

**Since:** 4.2

## See Also

- Sample - PointCloudLayer with renderer
- ClassBreaksRenderer
- Sample: PointCloudLayer - intensity color modulation

## Property Details

### `PointCloudClassBreaksRenderer`

### `colorClassBreakInfos`

### `colorModulation`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `field`

### `fieldTransformType`

### `legendOptions`

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
renderer.legendOptions = {
  title: "Density",
  order: "descending-values",
};
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

