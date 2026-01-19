# SliceAnalysis

**Module:** `@arcgis/core/analysis/SliceAnalysis`

## Import

```javascript
import SliceAnalysis from "@arcgis/core/analysis/SliceAnalysis.js";
```

```javascript
// CDN
const SliceAnalysis = await $arcgis.import("@arcgis/core/analysis/SliceAnalysis.js");
```

**Since:** 4.23

## See Also

- SliceAnalysisView3D
- SlicePlane
- Slice component
- Sample - Analysis objects

## Property Details

### `SliceAnalysis`

### `declaredClass`
- **Type:** `Inherited`

### `excludeGroundSurface`

### `excludedLayers`

### `id`
- **Type:** `Inherited`

### `origin`
- **Type:** `Inherited`

### `shape`

### `tiltEnabled`

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
const sliceAnalysis = new SliceAnalysis({
  shape: new SlicePlane({
    position: new Point({ }),
    width: 50,
    height: 50,
    tilt: 45
  }),
  tiltEnabled: true
});

view.analyses.add(sliceAnalysis);
```

```javascript
const sliceAnalysisView = await view.whenAnalysisView(sliceAnalysis);

// make the slice active in the view (only one slice can be active at a time)
sliceAnalysisView.active = true;
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
const abortController = new AbortController();

try {
  await analysisView.pickLayerToExclude({ signal: abortController.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Picking excluded layers operation was cancelled.");
  }
}

// cancel the operation at some later point
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

