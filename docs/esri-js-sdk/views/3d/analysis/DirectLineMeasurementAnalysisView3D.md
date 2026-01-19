# DirectLineMeasurementAnalysisView3D

**Module:** `@arcgis/core/views/3d/analysis/DirectLineMeasurementAnalysisView3D`

## Import

```javascript
import DirectLineMeasurementAnalysisView3D from "@arcgis/core/views/3d/analysis/DirectLineMeasurementAnalysisView3D.js";
```

```javascript
// CDN
const DirectLineMeasurementAnalysisView3D = await $arcgis.import("@arcgis/core/views/3d/analysis/DirectLineMeasurementAnalysisView3D.js");
```

## See Also

- DirectLineMeasurementAnalysis
- Direct Line Measurement 3D component
- Sample - Analysis objects

## Property Details

### `analysis`

### `interactive`

### `result`

### `type`

### `visible`

### `place`

### `DirectLineMeasurementAnalysisResult`

### `DirectLineMeasurementPlacementResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// retrieve analysis view for analysis
const analysis = new DirectLineMeasurementAnalysis();
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

