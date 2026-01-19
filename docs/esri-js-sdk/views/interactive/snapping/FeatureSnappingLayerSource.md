# FeatureSnappingLayerSource

**Module:** `@arcgis/core/views/interactive/snapping/FeatureSnappingLayerSource`

## Import

```javascript
import FeatureSnappingLayerSource from "@arcgis/core/views/interactive/snapping/FeatureSnappingLayerSource.js";
```

```javascript
// CDN
const FeatureSnappingLayerSource = await $arcgis.import("@arcgis/core/views/interactive/snapping/FeatureSnappingLayerSource.js");
```

**Since:** 4.19

## See Also

- SnappingOptions
- SnappingOptions

## Property Details

### `FeatureSnappingLayerSource`

### `declaredClass`
- **Type:** `Inherited`

### `enabled`

### `layer`

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
// Create a new instance of Sketch, and set
// a layer for one of the featureSources property.
// This enables feature snapping on that layer.
const Sketch = new Sketch({
  layer: graphicsLayer,
  view: view,
  snappingOptions: { // autocasts to SnappingOptions()
    enabled: true, // global snapping is turned on
    // assigns a collection of FeatureSnappingLayerSource() and enables feature snapping on this layer
    featureSources: [{ layer: graphicsLayer, enabled: true }]
  }
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

