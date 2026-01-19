# ElevationProfileAnalysisView2D

**Module:** `@arcgis/core/views/2d/analysis/ElevationProfileAnalysisView2D`

## Import

```javascript
import ElevationProfileAnalysisView2D from "@arcgis/core/views/2d/analysis/ElevationProfileAnalysisView2D.js";
```

```javascript
// CDN
const ElevationProfileAnalysisView2D = await $arcgis.import("@arcgis/core/views/2d/analysis/ElevationProfileAnalysisView2D.js");
```

**Since:** 4.34

## See Also

- ElevationProfileAnalysis
- ElevationProfileLineGround
- ElevationProfileLineInput
- ElevationProfileLineQuery
- ElevationProfileError
- ElevationProfileResult
- Sample - Elevation Profile analysis
- Async cancellation with AbortController

## Property Details

### `analysis`

### `effectiveDisplayUnits`

### `error`

### `hoveredPoints`

### `hoveredPosition`

### `interactive`

### `progress`

### `results`

### `statistics`

### `type`

### `updating`

### `visible`

### `pickFeature`

### `place`


## Method Details

### `Method Details()`


## Examples

```javascript
// Retrieve analysis view for analysis
const analysis = new ElevationProfileAnalysis();
view.analyses.add(analysis); // Add to the view
const analysisView = await view.whenAnalysisView(analysis);
```

```javascript
reactiveUtils.watch(
  () => analysisView.progress,
  (progress) => {
    // Watch the progress and update the chart or UI when needed
  });
```

```javascript
// Use AbortController to cancel the picking operation at some later point by calling abortController.abort()
const abortController = new AbortController();

try {
  await analysisView.pickFeature({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Picking operation was cancelled.");
  }
}
```

```javascript
// Use AbortController to cancel the placement operation at some later point by calling abortController.abort()
const abortController = new AbortController();

try {
  await analysisView.place({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Placement operation was cancelled.");
  }
}
```

