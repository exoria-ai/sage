# ViewshedLayerView

**Module:** `@arcgis/core/views/layers/ViewshedLayerView`

## Import

```javascript
import ViewshedLayerView from "@arcgis/core/views/layers/ViewshedLayerView.js";
```

```javascript
// CDN
const ViewshedLayerView = await $arcgis.import("@arcgis/core/views/layers/ViewshedLayerView.js");
```

**Since:** 4.31

## See Also

- ViewshedLayer
- Viewshed
- ViewshedAnalysis
- ViewshedAnalysisView3D
- Sample - ViewshedLayer in slides
- spatialReferenceSupported
- visibleAtCurrentTimeExtent
- suspended
- visibleAtCurrentScale
- suspended

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `interactive`

### `layer`

### `selectedViewshed`

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

### `createViewsheds`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `place`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// create new layer and add it to the map
const viewshedLayer = new ViewshedLayer();
view.map.add(viewshedLayer);

// retrieve layer view for the layer
const viewshedLayerView = await view.whenLayerView(viewshedLayer);
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
const abortController = new AbortController();

try {
  await viewshedLayerView.createViewsheds({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Creation operation was cancelled.");
  }
}

// cancel the placement operation at some later point
abortController.abort();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

