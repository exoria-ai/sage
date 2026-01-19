# AreaMeasurementAnalysis

**Module:** `@arcgis/core/analysis/AreaMeasurementAnalysis`

## Import

```javascript
import AreaMeasurementAnalysis from "@arcgis/core/analysis/AreaMeasurementAnalysis.js";
```

```javascript
// CDN
const AreaMeasurementAnalysis = await $arcgis.import("@arcgis/core/analysis/AreaMeasurementAnalysis.js");
```

**Since:** 4.23

## See Also

- AreaMeasurementAnalysisView3D
- Area Measurement 3D component
- Sample - Area measurement analysis object
- Sample - Analysis objects

## Property Details

### `AreaMeasurementAnalysis`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `id`
- **Type:** `Inherited`

### `origin`
- **Type:** `Inherited`

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
const areaMeasurement = new AreaMeasurementAnalysis({
  geometry: new Polygon({ })
});

// add to scene view
view.analyses.add(areaMeasurement);

// retrieve measured results from analysis view once available
const analysisView = await view.whenAnalysisView(areaMeasurement);
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

