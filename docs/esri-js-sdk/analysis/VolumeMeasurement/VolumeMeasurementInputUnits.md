# VolumeMeasurementInputUnits

**Module:** `@arcgis/core/analysis/VolumeMeasurement/VolumeMeasurementInputUnits`

## Import

```javascript
import VolumeMeasurementInputUnits from "@arcgis/core/analysis/VolumeMeasurement/VolumeMeasurementInputUnits.js";
```

```javascript
// CDN
const VolumeMeasurementInputUnits = await $arcgis.import("@arcgis/core/analysis/VolumeMeasurement/VolumeMeasurementInputUnits.js");
```

**Since:** 4.34

## See Also

- VolumeMeasurementAnalysis
- VolumeMeasurementAnalysisView3D

## Property Details

### `VolumeMeasurementInputUnits`

### `declaredClass`
- **Type:** `Inherited`

### `elevation`

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

