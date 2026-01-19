# VoxelDynamicSection

**Module:** `@arcgis/core/layers/voxel/VoxelDynamicSection`

## Import

```javascript
import VoxelDynamicSection from "@arcgis/core/layers/voxel/VoxelDynamicSection.js";
```

```javascript
// CDN
const VoxelDynamicSection = await $arcgis.import("@arcgis/core/layers/voxel/VoxelDynamicSection.js");
```

**Since:** 4.25

## Overview

The VoxelDynamicSection allows you to define the properties of an individual dynamic section. Dynamic sections define an opaque plane inside of the volume which draws when the renderMode is set to surfaces. They are not tied to a particular VoxelVariable, and their position and orientation can be modified with real-time rendering updates.

## Property Details

### `VoxelDynamicSection`

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
let dynSec = new VoxelDynamicSection({
  orientation: 270,
  tilt: 90,
  point: [128, 64, 89]
});
```

