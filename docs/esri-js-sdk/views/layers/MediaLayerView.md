# MediaLayerView

**Module:** `@arcgis/core/views/layers/MediaLayerView`

## Import

```javascript
import MediaLayerView from "@arcgis/core/views/layers/MediaLayerView.js";
```

```javascript
// CDN
const MediaLayerView = await $arcgis.import("@arcgis/core/views/layers/MediaLayerView.js");
```

**Since:** 4.30

## See Also

- MediaLayer
- interactive
- selectedElement
- interactionOptions
- interactive
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended
- SceneView.highlights
- Sample: Highlight point features

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `interactionOptions`

### `interactive`

### `layer`

### `selectedElement`

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

### `hasHandles`
- **Type:** `Inherited`

### `highlight`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
view.whenLayerView(mediaLayer).then((mediaLayerView) => {
  // Enable interactivity and select first element
  mediaLayerView.interactive = true;

  mediaLayerView.selectedElement = mediaLayer.source.elements.at(0);
});
```

```javascript
view.whenLayerView(mediaLayer).then((mediaLayerView) => {
  // Enable interactivity and select first element
  mediaLayerView.interactive = true;

  mediaLayerView.selectedElement = mediaLayer.source.elements.at(0);
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

