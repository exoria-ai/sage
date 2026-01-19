# PointCloudLayerView

**Module:** `@arcgis/core/views/layers/PointCloudLayerView`

## Import

```javascript
import PointCloudLayerView from "@arcgis/core/views/layers/PointCloudLayerView.js";
```

**Since:** 4.13

## See Also

- PointCloudLayer
- PointCloudLayer.outFields
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended
- SceneView.highlights

## Property Details

### `availableFields`

### `declaredClass`
- **Type:** `Inherited`

### `layer`

### `suspended`
- **Type:** `Inherited`

### `uid`
- **Type:** `Inherited`

### `updating`
- **Type:** `Inherited`

### `view`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `visibleAtCurrentScale`
- **Type:** `Inherited`

### `visibleAtCurrentTimeExtent`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `createQuery`

### `hasHandles`
- **Type:** `Inherited`

### `highlight`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Check for the first time layerView.updating becomes false. Then query for
// features that are visible within the view associated with the layer view.
await reactiveUtils.whenOnce(() => !layerView.updating);
const query = layerView.createQuery();
query.geometry = layerView.view.extent;
const result = layerView.queryFeatures(query);
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
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
// Use the default highlights collection to apply a highlight to points when you hover over them

// A handler can be used to remove any previous highlight when applying a new one
let hoverHighlight;

view.on("pointer-move", (event) => {
  // Search for the first feature in the layer at the hovered location
  view.hitTest(event).then((response) => {
    if (response.results[0]) {
      const graphic = response.results[0].graphic;
      view.whenLayerView(graphic.layer).then((layerView) => {
        // Remove any previous highlight, if it exists
        hoverHighlight?.remove();
        // Highlight the hit points with the temporary highlight options, which are pre-configured for this use case
        hoverHighlight = layerView.highlight(graphic, { name: "temporary" });
      });
    }
  });
});
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

