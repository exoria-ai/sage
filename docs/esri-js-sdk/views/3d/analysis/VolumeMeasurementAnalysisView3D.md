# VolumeMeasurementAnalysisView3D

**Module:** `@arcgis/core/views/3d/analysis/VolumeMeasurementAnalysisView3D`

## Import

```javascript
import VolumeMeasurementAnalysisView3D from "@arcgis/core/views/3d/analysis/VolumeMeasurementAnalysisView3D.js";
```

```javascript
// CDN
const VolumeMeasurementAnalysisView3D = await $arcgis.import("@arcgis/core/views/3d/analysis/VolumeMeasurementAnalysisView3D.js");
```

**Since:** 4.34

## See Also

- VolumeMeasurementAnalysis
- VolumeMeasurementResult
- VolumeMeasurementError
- Async cancellation with AbortController
- Sample - Volume measurement analysis object

## Property Details

### `analysis`

### `error`

### `interactive`

### `result`

### `type`

### `visible`

### `place`

### `VolumeMeasurementPlacementResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// retrieve analysis view for analysis
const analysis = new VolumeMeasurementAnalysis();
view.analyses.add(analysis); // add to the scene view
const analysisView = await view.whenAnalysisView(analysis);
```

```javascript
// cancel the placement operation at some later point
// by calling abortController.abort()
const abortController = new AbortController();

try {
  await analysisView.place({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Placement operation was cancelled.");
  }
}
```

