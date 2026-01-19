# VoxelTransferFunctionStyle

**Module:** `@arcgis/core/layers/voxel/VoxelTransferFunctionStyle`

## Import

```javascript
import VoxelTransferFunctionStyle from "@arcgis/core/layers/voxel/VoxelTransferFunctionStyle.js";
```

```javascript
// CDN
const VoxelTransferFunctionStyle = await $arcgis.import("@arcgis/core/layers/voxel/VoxelTransferFunctionStyle.js");
```

**Since:** 4.25

## Overview

The VoxelTransferFunctionStyle allows you to define how an individual continuous variable is rendered as a volume or as sections. The stretchRange is the range in the data to apply the colorStops and opacityStops to. The rangeFilter defines which data values will draw. Values outside the stretchRange, but within the range of the rangeFilter (if one is defined), will draw with the color and transparency assigned to either the minimum or maximum value in the stretchRange.

## Property Details

### `VoxelTransferFunctionStyle`

### `colorStops`

### `opacityStops`

### `rangeFilter`

### `stretchRange`

### `clone`

### `fromJSON`

### `toJSON`

### `VoxelColorStop`

### `VoxelOpacityStop`

### `VoxelRangeFilter`


## Method Details

### `Method Details()`


## Examples

```javascript
// Typical usage
let transferFunction = new VoxelTransferFunctionStyle({
  stretchRange: [327.1, 2941.5],
  colorStops: [{
      color: [34, 44, 246, 255],
      position: 0
   }, {
      color: [68,166, 22, 255],
      position: 0.5
   }, {
       color: [252, 146, 251, 255],
       position: 1
   }],
  rangeFilter: {
	  range: [0, 3266]
 }
});
```

