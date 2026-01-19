# ViewshedAnalysisView3D

**Module:** `@arcgis/core/views/3d/analysis/ViewshedAnalysisView3D`

## Import

```javascript
import ViewshedAnalysisView3D from "@arcgis/core/views/3d/analysis/ViewshedAnalysisView3D.js";
```

```javascript
// CDN
const ViewshedAnalysisView3D = await $arcgis.import("@arcgis/core/views/3d/analysis/ViewshedAnalysisView3D.js");
```

**Since:** 4.30

## See Also

- ViewshedAnalysis
- Viewshed
- ViewshedLayer
- ViewshedLayerView
- Sample - Interactive viewshed analysis
- Sample - Analysis objects
- 3D viewshed overview

## Property Details

### `analysis`

### `interactive`

### `selectedViewshed`

### `type`

### `visible`

### `createViewsheds`

### `place`

### `ViewshedPlacementResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// create new analysis and add it to the view
const viewshedAnalysis = new ViewshedAnalysis();
view.analyses.add(viewshedAnalysis);

// retrieve analysis view
const viewshedAnalysisView = await view.whenAnalysisView(viewshedAnalysis);
```

```javascript
const abortController = new AbortController();

try {
  await viewshedAnalysisView.createViewsheds({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Creation operation was cancelled.");
  }
}

// cancel the placement operation at some later point
abortController.abort();
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

