# DirectLineMeasurementAnalysis

**Module:** `@arcgis/core/analysis/DirectLineMeasurementAnalysis`

## Import

```javascript
import DirectLineMeasurementAnalysis from "@arcgis/core/analysis/DirectLineMeasurementAnalysis.js";
```

```javascript
// CDN
const DirectLineMeasurementAnalysis = await $arcgis.import("@arcgis/core/analysis/DirectLineMeasurementAnalysis.js");
```

**Since:** 4.23

## See Also

- DirectLineMeasurementAnalysisView3D
- Direct Line Measurement 3D component
- Sample - Analysis objects

## Property Details

### `DirectLineMeasurementAnalysis`

### `declaredClass`
- **Type:** `Inherited`

### `endPoint`

### `id`
- **Type:** `Inherited`

### `origin`
- **Type:** `Inherited`

### `startPoint`

### `type`

### `uid`
- **Type:** `Inherited`

### `unit`

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
const directLineMeasurement = new DirectLineMeasurementAnalysis({
  startPoint: new Point({ }),
  endPoint: new Point({ }),
  unit: "imperial"
});

// add to the scene view
view.analyses.add(directLineMeasurement);

// retrieve measured results from analysis view once available
const analysisView = await view.whenAnalysisView(directLineMeasurement);
await reactiveUtils.whenOnce(() => analysisView.result);

const result = analysisView.result;
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

