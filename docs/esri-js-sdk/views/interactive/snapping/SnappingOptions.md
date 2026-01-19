# SnappingOptions

**Module:** `@arcgis/core/views/interactive/snapping/SnappingOptions`

## Import

```javascript
import SnappingOptions from "@arcgis/core/views/interactive/snapping/SnappingOptions.js";
```

```javascript
// CDN
const SnappingOptions = await $arcgis.import("@arcgis/core/views/interactive/snapping/SnappingOptions.js");
```

**Since:** 4.19

## See Also

- FeatureSnappingLayerSource
- Sketch
- SketchViewModel
- Editor
- Sample - Sketch widget
- Sample - Sketch in 3D
- Sample - Edit features in 3D with the Editor widget
- Sample - Editor widget with configurations
- Sample - Snapping with Sketch widget and Magnifier
- GridControls

## Property Details

### `SnappingOptions`

### `attributeRulesEnabled`

### `declaredClass`
- **Type:** `Inherited`

### `distance`

### `enabled`

### `featureEnabled`

### `featureSources`

### `gridEnabled`

### `selfEnabled`

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
const sketch = new Sketch({
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
// Turn on the grid programmatically for the GridControls.
// Wait for the view to load first.
view.when(() => {
  const gridControls = new GridControls({
    view,
    snappingOptions: {
      enabled: true,
      gridEnabled: true
    }
  });
  // Add GridControls to the view
  view.ui.add(gridControls, "top-left");
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

