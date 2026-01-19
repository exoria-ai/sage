# AreaMeasurementAnalysisView3D

**Module:** `@arcgis/core/views/3d/analysis/AreaMeasurementAnalysisView3D`

## Import

```javascript
import AreaMeasurementAnalysisView3D from "@arcgis/core/views/3d/analysis/AreaMeasurementAnalysisView3D.js";
```

```javascript
// CDN
const AreaMeasurementAnalysisView3D = await $arcgis.import("@arcgis/core/views/3d/analysis/AreaMeasurementAnalysisView3D.js");
```

## See Also

- AreaMeasurementAnalysis
- Area Measurement 3D component
- Sample - Area measurement analysis object
- Sample - Analysis objects

## Property Details

### `analysis`

### `interactive`

### `result`

### `type`

### `visible`

### `place`

### `AreaMeasurementAnalysisResult`

### `AreaMeasurementPlacementResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// retrieve analysis view for analysis
const analysis = new AreaMeasurementAnalysis();
view.analyses.add(analysis); // add to the scene view
const analysisView = await view.whenAnalysisView(analysis);
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

