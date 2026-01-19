# DimensionLayerView

**Module:** `@arcgis/core/views/layers/DimensionLayerView`

## Import

```javascript
import DimensionLayerView from "@arcgis/core/views/layers/DimensionLayerView.js";
```

```javascript
// CDN
const DimensionLayerView = await $arcgis.import("@arcgis/core/views/layers/DimensionLayerView.js");
```

**Since:** 4.25

## See Also

- DimensionLayer
- DimensionAnalysis
- LengthDimension
- DimensionSimpleStyle
- DimensionAnalysisView3D
- Sample - Length dimensioning
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

### `results`

### `selectedDimension`

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

### `createLengthDimensions`

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
const dimensionLayer = new DimensionLayer();
view.map.add(dimensionLayer);

// retrieve layer view for the layer
const dimensionLayerView = await view.whenLayerView(dimensionLayer);
```

```javascript
const result = dimensionLayerView.results.find((result) => result.dimension === dimensionObject);
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
  await layerView.createLengthDimensions({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Creation operation was cancelled.");
  }
}

// cancel the placement operation at some later point
abortController.abort();
```

