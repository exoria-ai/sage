# LineOfSightAnalysisView3D

**Module:** `@arcgis/core/views/3d/analysis/LineOfSightAnalysisView3D`

## Import

```javascript
import LineOfSightAnalysisView3D from "@arcgis/core/views/3d/analysis/LineOfSightAnalysisView3D.js";
```

```javascript
// CDN
const LineOfSightAnalysisView3D = await $arcgis.import("@arcgis/core/views/3d/analysis/LineOfSightAnalysisView3D.js");
```

## See Also

- LineOfSightAnalysis
- LineOfSightLayer
- LineOfSightLayerView
- LineOfSightAnalysisTarget
- LineOfSightAnalysisObserver
- Line Of Sight component
- Sample - Analysis objects
- Sample - Line of sight component

## Property Details

### `analysis`

### `interactive`

### `results`

### `type`

### `visible`

### `place`

### `LineOfSightPlacementResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// retrieve analysis view for analysis
const analysis = new LineOfSightAnalysis();
view.analyses.add(analysis); // add to the view
const analysisView = await view.whenAnalysisView(analysis);
```

```javascript
const analysisView = await view.whenAnalysisView(lineOfSightAnalysis);
const result = analysisView.results.at(targetIdx);
```

```javascript
const result = analysisView.results.find((result) => result.target === targetObject);
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

