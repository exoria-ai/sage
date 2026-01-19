# ElevationProfileAnalysis

**Module:** `@arcgis/core/analysis/ElevationProfileAnalysis`

## Import

```javascript
import ElevationProfileAnalysis from "@arcgis/core/analysis/ElevationProfileAnalysis.js";
```

```javascript
// CDN
const ElevationProfileAnalysis = await $arcgis.import("@arcgis/core/analysis/ElevationProfileAnalysis.js");
```

**Since:** 4.34

## See Also

- ElevationProfileAnalysisView2D
- ElevationProfileAnalysisView3D
- Sample - Elevation Profile analysis
- Sample - Analysis objects
- Elevation Profile component
- Async cancellation with AbortController

## Property Details

### `ElevationProfileAnalysis`

### `declaredClass`
- **Type:** `Inherited`

### `displayUnits`

### `elevationInfo`

### `geometry`

### `id`
- **Type:** `Inherited`

### `origin`
- **Type:** `Inherited`

### `profiles`

### `type`

### `uid`
- **Type:** `Inherited`

### `valid`

### `viewOptions`

### `addHandles`
- **Type:** `Inherited`

### `clone`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const elevationProfileAnalysis = new ElevationProfileAnalysis({
  profiles: [
    // Profile line that samples the ground elevation
    {
      type: "ground",
      color: "rgb(150, 75, 0)",
    }
  ],
  geometry: new Polyline({ })
});

view.analyses.add(elevationProfileAnalysis);
```

```javascript
// Get the analysis view
const analysisView = await view.whenAnalysisView(elevationProfileAnalysis);
// Retrieve the results, once they are ready
reactiveUtils.watch(
  () => analysisView.progress,
  (progress) => {
    if (progress === 1) {
      console.log("Results are computed", analysisView.results);
      console.log("Statistics are computed", analysisView.statistics);
    }
  }
);
```

```javascript
const abortController = new AbortController();

try {
  // Start placing a new profile line interactively
  await analysisView.place({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Placement operation was cancelled.");
  }
}

// Cancel the operation at some later point
abortController.abort();
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
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

