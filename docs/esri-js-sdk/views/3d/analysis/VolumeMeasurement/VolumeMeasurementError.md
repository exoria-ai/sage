# VolumeMeasurementError

**Module:** `@arcgis/core/views/3d/analysis/VolumeMeasurement/VolumeMeasurementError`

## Import

```javascript
import VolumeMeasurementError from "@arcgis/core/views/3d/analysis/VolumeMeasurement/VolumeMeasurementError.js";
```

```javascript
// CDN
const VolumeMeasurementError = await $arcgis.import("@arcgis/core/views/3d/analysis/VolumeMeasurement/VolumeMeasurementError.js");
```

**Since:** 4.34

## Overview

VolumeMeasurementError is an error class for reporting errors in a VolumeMeasurementAnalysisView3D. The following error names are defined: "distance-too-far": The view point is too far away from the volume measurement, making the measurement inaccurate. "distance-too-close": The view point is too close to the volume measurement, making the measurement inaccurate. "perimeter-too-large": The input geometry's perimeter is too large for the current coordinate system. "unsupported-coordinate-system": The coordinate system of the view (viewing mode and spatial reference) is not supported. "unsupported-layer-transparency": The volume measurement analysis does not support transparent layers. "unknown": An unknown error occurred.

## See Also

- VolumeMeasurementAnalysis
- VolumeMeasurementAnalysisView3D
- Sample - Volume measurement analysis object

## Property Details

### `VolumeMeasurementError`

### `details`
- **Type:** `Inherited`

### `message`
- **Type:** `Inherited`

### `name`

### `VolumeMeasurementErrorName`


## Examples

```javascript
someAsyncFunction.then(callback)
  .catch(function(error){
    console.log("Error details: ", error.details);
});
```

```javascript
someAsyncFunction.then(callback)
  .catch(function(error){
    console.log("Error message: ", error.message);
});
```

