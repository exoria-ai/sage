# VolumeMeasurementResult

**Module:** `@arcgis/core/views/3d/analysis/VolumeMeasurement/VolumeMeasurementResult`

## Import

```javascript
import VolumeMeasurementResult from "@arcgis/core/views/3d/analysis/VolumeMeasurement/VolumeMeasurementResult.js";
```

```javascript
// CDN
const VolumeMeasurementResult = await $arcgis.import("@arcgis/core/views/3d/analysis/VolumeMeasurement/VolumeMeasurementResult.js");
```

**Since:** 4.34

## See Also

- VolumeMeasurementAnalysis
- VolumeMeasurementAnalysisView3D
- Sample - Volume measurement analysis object

## Property Details

### `cutVolume`

### `declaredClass`
- **Type:** `Inherited`

### `fillVolume`

### `netVolume`

### `totalVolume`

### `addHandles`
- **Type:** `Inherited`

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

