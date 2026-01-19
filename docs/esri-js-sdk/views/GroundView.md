# GroundView

**Module:** `@arcgis/core/views/GroundView`

## Import

```javascript
import GroundView from "@arcgis/core/views/GroundView.js";
```

```javascript
// CDN
const GroundView = await $arcgis.import("@arcgis/core/views/GroundView.js");
```

**Since:** 4.7

## See Also

- SceneView.groundView
- ElevationLayer.createElevationSampler()
- ElevationSampler
- LayerView

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `elevationSampler`

### `extent`

### `layerViews`

### `updating`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let elevationSampler = view.groundView.elevationSampler;
// watch for changes in the elevationSampler
elevationSampler.on('changed', function() {
  // get z-values from the elevation displayed in the view
  let zEnrichedGeometry = elevationSampler.queryElevation(geometry);
});
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

