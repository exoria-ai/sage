# LineOfSightLayerView

**Module:** `@arcgis/core/views/layers/LineOfSightLayerView`

## Import

```javascript
import LineOfSightLayerView from "@arcgis/core/views/layers/LineOfSightLayerView.js";
```

```javascript
// CDN
const LineOfSightLayerView = await $arcgis.import("@arcgis/core/views/layers/LineOfSightLayerView.js");
```

## See Also

- LineOfSightLayer
- LineOfSightAnalysis
- LineOfSightAnalysisTarget
- LineOfSightAnalysisObserver
- LineOfSightAnalysisView3D
- Line Of Sight component
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
const lineOfSightLayer = new LineOfSightLayer();
view.map.add(lineOfSightLayer);

// retrieve layer view for the layer
const lineOfSightLayerView = await view.whenLayerView(lineOfSightLayer);
```

```javascript
const layerView = await view.whenLayerView(lineOfSightLayer);
const result = layerView.results.at(targetIdx);
```

```javascript
const result = layerView.results.find((result) => result.target === targetObject);
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

