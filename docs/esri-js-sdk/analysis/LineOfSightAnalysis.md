# LineOfSightAnalysis

**Module:** `@arcgis/core/analysis/LineOfSightAnalysis`

## Import

```javascript
import LineOfSightAnalysis from "@arcgis/core/analysis/LineOfSightAnalysis.js";
```

```javascript
// CDN
const LineOfSightAnalysis = await $arcgis.import("@arcgis/core/analysis/LineOfSightAnalysis.js");
```

**Since:** 4.23

## See Also

- LineOfSightAnalysisView3D
- LineOfSightLayer
- LineOfSightLayerView
- LineOfSightAnalysisTarget
- LineOfSightAnalysisObserver
- Line Of Sight component
- Sample - Analysis objects
- Sample - Line of sight component

## Property Details

### `LineOfSightAnalysis`

### `declaredClass`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `observer`

### `origin`
- **Type:** `Inherited`

### `targets`

### `type`

### `uid`
- **Type:** `Inherited`

### `valid`

### `addHandles`
- **Type:** `Inherited`

### `clone`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `LineOfSightAnalysisFeatureReference`


## Method Details

### `Method Details()`


## Examples

```javascript
// create line of sight analysis
const lineOfSightAnalysis = new LineOfSightAnalysis({
  observer: new LineOfSightAnalysisObserver({ position: new Point({ }) }),
  targets:[
    new LineOfSightAnalysisTarget({ position: new Point({ }) })
  ]
});

// add to the view
view.analyses.add(lineOfSightAnalysis);

// wait for the view to not be updating to ensure we get the latest results.
await reactiveUtils.whenOnce(() => !view.updating);

// retrieve the results from the analysis view.
const analysisView = await view.whenAnalysisView(lineOfSightAnalysis);
const results = analysisView.results;
```

```javascript
// create line of sight layer containing the analysis
const lineOfSightLayer = new LineOfSightLayer({
  analysis: lineOfSightAnalysis
});

// add to the map
view.map.add(lineOfSightLayer);
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

