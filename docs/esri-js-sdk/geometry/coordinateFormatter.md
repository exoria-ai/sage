# coordinateFormatter

**Module:** `@arcgis/core/geometry/coordinateFormatter`

## Import

```javascript
import * as coordinateFormatter from "@arcgis/core/geometry/coordinateFormatter.js";
```

```javascript
// CDN
const coordinateFormatter = await $arcgis.import("@arcgis/core/geometry/coordinateFormatter.js");
```

**Since:** 4.7

## Overview

Converts between points and formatted coordinates notation strings such as: decimal degrees degrees, minutes, and seconds U.S. National Grid (USNG) Military Grid Reference System (MGRS). To use the conversion methods, the load() method must be called first if isLoaded() is false. Known Limitations The browser must support WebAssembly for this module to work. The methods that convert formatted strings to points expect the spatial reference parameter to be a geographic coordinate system. The methods that convert points to formatted strings expect the point's spatialReference to be a geographic coordinate system.

## See Also

- isLoaded()

## Property Details

### `fromLatitudeLongitude`

### `fromMgrs`

### `fromUsng`

### `fromUtm`

### `isLoaded`

### `isSupported`

### `load`

### `toLatitudeLongitude`

### `toMgrs`

### `toUsng`

### `toUtm`


## Method Details

### `Method Details()`


## Examples

```javascript
// Assign a latitude/longitude string to a const.
const latlon = "55 56 39.123N 003 09 43.034W";

// Load dependencies.
await coordinateFormatter.load();

// Use the `fromLatitudeLongitude` method to convert the latitude/longitude string to a point geometry.
const point = coordinateFormatter.fromLatitudeLongitude(latlon);
```

