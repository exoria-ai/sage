# LineOfSightAnalysisObserver

**Module:** `@arcgis/core/analysis/LineOfSightAnalysisObserver`

## Import

```javascript
import LineOfSightAnalysisObserver from "@arcgis/core/analysis/LineOfSightAnalysisObserver.js";
```

```javascript
// CDN
const LineOfSightAnalysisObserver = await $arcgis.import("@arcgis/core/analysis/LineOfSightAnalysisObserver.js");
```

**Since:** 4.23

## See Also

- LineOfSightAnalysis
- LineOfSightAnalysisView3D
- Line Of Sight component
- Sample - Analysis objects
- Sample - Line of sight component

## Property Details

### `LineOfSightAnalysisObserver`

### `declaredClass`
- **Type:** `Inherited`

### `elevationInfo`

### `feature`

### `position`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


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

