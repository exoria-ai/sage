# SliceAnalysisView3D

**Module:** `@arcgis/core/views/3d/analysis/SliceAnalysisView3D`

## Import

```javascript
import SliceAnalysisView3D from "@arcgis/core/views/3d/analysis/SliceAnalysisView3D.js";
```

```javascript
// CDN
const SliceAnalysisView3D = await $arcgis.import("@arcgis/core/views/3d/analysis/SliceAnalysisView3D.js");
```

## See Also

- SliceAnalysis
- SlicePlane
- Slice component
- Sample - Analysis objects

## Property Details

### `active`

### `analysis`

### `interactive`

### `type`

### `visible`

### `pickLayerToExclude`

### `place`

### `SlicePlacementResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// retrieve analysis view for analysis
const sliceAnalysis = new SliceAnalysis();
view.analyses.add(sliceAnalysis); // add to the scene view
const sliceAnalysisView = await view.whenAnalysisView(sliceAnalysis);
```

```javascript
const abortController = new AbortController();

try {
  await analysisView.place({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Placement operation was cancelled.");
  }
}

// cancel the placement operation at some later point
abortController.abort();
```

