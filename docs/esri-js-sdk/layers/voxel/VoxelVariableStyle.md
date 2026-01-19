# VoxelVariableStyle

**Module:** `@arcgis/core/layers/voxel/VoxelVariableStyle`

## Import

```javascript
import VoxelVariableStyle from "@arcgis/core/layers/voxel/VoxelVariableStyle.js";
```

```javascript
// CDN
const VoxelVariableStyle = await $arcgis.import("@arcgis/core/layers/voxel/VoxelVariableStyle.js");
```

**Since:** 4.25

## Property Details

### `VoxelVariableStyle`

### `isosurfaces`

### `label`

### `transferFunction`

### `uniqueValues`

### `variableId`

### `clone`

### `fromJSON`

### `toJSON`

### `VoxelIsosurface`

### `VoxelUniqueValue`


## Method Details

### `Method Details()`


## Examples

```javascript
// Typical usage
let vxlVariableStyle = new VoxelVariableStyle({
  variableId: 0,
  transferFunction: {
    interpolation: "linear",
    stretchRange: [-803.3854370117188, 804.6875],
    colorStops: [
      {
        color: [23, 244, 247, 255],
        position: 0
      },
      {
        color: [87, 25, 244, 255],
        position: 0.5
      },
      {
        color: [255, 37, 245, 255],
        position: 1
      }
    ],
    rangeFilter: {
      range: [-1000, 1000]
    }
  },
  isosurfaces: [
    {
      color: [102, 136, 248, 255],
      value: -374.6990966796875,
      label: "f32 data -1000 to 1000"
   }
  ],
  label: "f32 data -1000 to 1000"
});
```

