# ElevationProfileError

**Module:** `@arcgis/core/views/analysis/ElevationProfile/ElevationProfileError`

## Import

```javascript
import ElevationProfileError from "@arcgis/core/views/analysis/ElevationProfile/ElevationProfileError.js";
```

```javascript
// CDN
const ElevationProfileError = await $arcgis.import("@arcgis/core/views/analysis/ElevationProfile/ElevationProfileError.js");
```

**Since:** 4.34

## Overview

ElevationProfileError is an error class for reporting errors in an ElevationProfileAnalysisView2D or ElevationProfileAnalysisView3D. The following error names are defined: "invalid-geometry": The input geometry is invalid (for example, the path has less than two points). "too-complex": The input geometry has too many points. "elevation-query-error": An error occurred while querying the elevation data. "unknown": An unknown error occurred.

## See Also

- ElevationProfileAnalysis
- ElevationProfileAnalysisView2D
- ElevationProfileAnalysisView3D

## Property Details

### `ElevationProfileError`

### `details`
- **Type:** `Inherited`

### `message`
- **Type:** `Inherited`

### `name`

### `ElevationProfileErrorName`


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

