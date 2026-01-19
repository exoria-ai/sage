# ElevationProfileResult

**Module:** `@arcgis/core/views/analysis/ElevationProfile/ElevationProfileResult`

## Import

```javascript
import ElevationProfileResult from "@arcgis/core/views/analysis/ElevationProfile/ElevationProfileResult.js";
```

```javascript
// CDN
const ElevationProfileResult = await $arcgis.import("@arcgis/core/views/analysis/ElevationProfile/ElevationProfileResult.js");
```

**Since:** 4.34

## See Also

- ElevationProfileAnalysis
- ElevationProfileAnalysisView2D
- ElevationProfileAnalysisView3D

## Property Details

### `available`

### `declaredClass`
- **Type:** `Inherited`

### `profile`

### `progress`

### `samples`

### `statistics`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `Sample`

### `Statistics`


## Method Details

### `Method Details()`


## Examples

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

