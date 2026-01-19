# VolumeMeasurementAnalysis

**Module:** `@arcgis/core/analysis/VolumeMeasurementAnalysis`

## Import

```javascript
import VolumeMeasurementAnalysis from "@arcgis/core/analysis/VolumeMeasurementAnalysis.js";
```

```javascript
// CDN
const VolumeMeasurementAnalysis = await $arcgis.import("@arcgis/core/analysis/VolumeMeasurementAnalysis.js");
```

**Since:** 4.34

## See Also

- VolumeMeasurementAnalysisView3D
- VolumeMeasurementCutFillOptions
- VolumeMeasurementResult
- VolumeMeasurementDisplayUnits
- VolumeMeasurementInputUnits
- VolumeMeasurementError
- Async cancellation with AbortController
- Sample - Volume measurement analysis object

## Property Details

### `VolumeMeasurementAnalysis`

### `cutFillOptions`

### `declaredClass`
- **Type:** `Inherited`

### `displayUnits`

### `geometry`

### `id`
- **Type:** `Inherited`

### `inputUnits`

### `measureType`

### `origin`
- **Type:** `Inherited`

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


## Method Details

### `Method Details()`


## Examples

```javascript
// create analysis
const volumeMeasurementAnalysis = new VolumeMeasurementAnalysis({
  measureType: "stockpile", // if not set it defaults to "cut-fill"
  geometry: new Polygon({ }),
});

// add to scene view
view.analyses.add(volumeMeasurementAnalysis);

// retrieve the result from the analysis view once available
const analysisView = await view.whenAnalysisView(volumeMeasurementAnalysis);
await reactiveUtils.whenOnce(() => analysisView.result);

const result = analysisView.result;
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

