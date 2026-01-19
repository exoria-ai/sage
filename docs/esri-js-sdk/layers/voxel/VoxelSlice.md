# VoxelSlice

**Module:** `@arcgis/core/layers/voxel/VoxelSlice`

## Import

```javascript
import VoxelSlice from "@arcgis/core/layers/voxel/VoxelSlice.js";
```

```javascript
// CDN
const VoxelSlice = await $arcgis.import("@arcgis/core/layers/voxel/VoxelSlice.js");
```

**Since:** 4.25

## Overview

The VoxelSlice allows you to define the properties of an individual slice. Slices clip the volume along an infinite plane to yield a convex shell that is rendered. Updates to the position, orientation and tilt of a slice are rendered in real-time.

## Property Details

### `VoxelSlice`

### `enabled`

### `label`

### `orientation`

### `point`

### `tilt`

### `clone`

### `fromJSON`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// Typical usage
let slice = new VoxelSlice({
  orientation: 270,
  tilt: 90,
  point: [128, 64, 89]
});
```

