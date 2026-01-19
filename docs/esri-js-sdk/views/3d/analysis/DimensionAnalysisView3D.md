# DimensionAnalysisView3D

**Module:** `@arcgis/core/views/3d/analysis/DimensionAnalysisView3D`

## Import

```javascript
import DimensionAnalysisView3D from "@arcgis/core/views/3d/analysis/DimensionAnalysisView3D.js";
```

```javascript
// CDN
const DimensionAnalysisView3D = await $arcgis.import("@arcgis/core/views/3d/analysis/DimensionAnalysisView3D.js");
```

**Since:** 4.33

## See Also

- DimensionAnalysis
- LengthDimension
- DimensionSimpleStyle
- DimensionLayer
- DimensionLayerView
- Sample - Length dimensioning
- Sample - Analysis objects

## Property Details

### `analysis`

### `declaredClass`
- **Type:** `Inherited`

### `interactive`

### `results`

### `selectedDimension`

### `type`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `createLengthDimensions`

### `hasHandles`
- **Type:** `Inherited`

### `place`

### `removeHandles`
- **Type:** `Inherited`

### `DimensionPlacementResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// create new analysis and add it to the view
const dimensionAnalysis = new DimensionAnalysis();
view.analyses.add(dimensionAnalysis);

// retrieve analysis view for the analysis
const dimensionAnalysisView = await view.whenAnalysisView(dimensionAnalysis);
```

```javascript
const dimensionAnalysisView = await view.whenAnalysisView(dimensionAnalysis);
const result = dimensionAnalysisView.results.at(dimensionIdx);
```

```javascript
const result = dimensionAnalysisView.results.find((result) => result.dimension === dimensionObject);
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
  await analysisView.createLengthDimensions({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Placement operation was cancelled.");
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

