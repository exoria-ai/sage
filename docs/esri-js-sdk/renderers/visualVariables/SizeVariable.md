# SizeVariable

**Module:** `@arcgis/core/renderers/visualVariables/SizeVariable`

## Import

```javascript
import SizeVariable from "@arcgis/core/renderers/visualVariables/SizeVariable.js";
```

```javascript
// CDN
const SizeVariable = await $arcgis.import("@arcgis/core/renderers/visualVariables/SizeVariable.js");
```

**Since:** 4.10

## See Also

- Sample - Continuous size
- Sample - Visualize features thematically with extrusion
- Sample - Scale feature sizes based on real world sizes (2D)
- Sample - Visualize features with realistic 3D symbols
- Sample - Extrude building footprints based on real world heights
- RealWorldSize
- Arcade - Visualization Profile
- RealWorldSize

## Property Details

### `SizeVariable`

### `axis`

### `declaredClass`
- **Type:** `Inherited`

### `field`
- **Type:** `Inherited`

### `legendOptions`

### `maxDataValue`

### `maxSize`

### `minDataValue`

### `minSize`

### `normalizationField`

### `stops`

### `target`

### `type`

### `useSymbolValue`

### `valueExpression`
- **Type:** `Inherited`

### `valueExpressionTitle`
- **Type:** `Inherited`

### `valueRepresentation`

### `valueUnit`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `flipSizes`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// features with WIND_SPEED of 0 will be rendered with a size of 8pts
// features with WIND_SPEED of 60 will be rendered with a size of 40pts
// features with WIND_SPEED between 0 and 60 will be rendered with sizes
// between 8 and 40 points, interpolated linearly

const sizeVisualVariable = {
  type: "size",
  field: "WIND_SPEED",
  minDataValue: 0,
  maxDataValue: 60,
  minSize: 8,
  maxSize: 40
};
renderer.visualVariables = [ sizeVisualVariable ];
```

```javascript
// features with POP_POVERTY / TOTPOP_CY = 0.15 will be rendered with a size of 4pts
// features with POP_POVERTY / TOTPOP_CY = 0.25 will be rendered with a size of 12pts
// features with POP_POVERTY / TOTPOP_CY = 0.35 will be rendered with a size of 24pts
// features with POP_POVERTY / TOTPOP_CY between those values will be rendered
// will be rendered with sizes between the defined stops, interpolated linearly
// the legend will show the labels defined in each stop

renderer.visualVariables = [{
  type: "size",
  field: "POP_POVERTY",
  normalizationField: "TOTPOP_CY",
  legendOptions: {
    title: "% population in poverty by county"
  },
  stops: [
    { value: 0.15, size: 4, label: "<15%" },
    { value: 0.25, size: 12, label: "25%" },
    { value: 0.35, size: 24, label: ">35%" }
  ]
}];
```

```javascript
// all features will be rendered with the same outline width at a given view scale
// outline width will shrink as the user zooms out (until it eventually disappears),
// and grow as the user zooms in.

const sizeVisualVariable = {
  type: "size",
  valueExpression: "$view.scale",
  target: "outline",
  stops: [
    { size: 2, value: 1155581.108577 },
    { size: 1, value: 9244648.868618 },
    { size: 0.5, value: 73957190.948944 },
    { size: 0, value: 591657527.591555 }
  ]
};
renderer.visualVariables = [ sizeVisualVariable ];
```

```javascript
// features are rendered as bounded proportional symbols based on the poverty rate, but the overall
// sizes of the symbols will grow as the user zooms in and shrink as the user zooms out, providing
// a cleaner visualization of the data at each scale.

// features with poverty rates of 15% will be rendered with a size of 3pts at scale 1:15,886,548
// and a size of 12pts at scale 1:1,128
// features with poverty rates of 45% will be rendered with a size of 32pts at scale 1:15,886,548
// and a size of 60pts at scale 1:1,128
// features with poverty rates between 15-45% will be rendered with sizes between those values,
// depending on the view scale.

const sizeVisualVariable = {
  type: "size",
  valueExpression: "( $feature.POP_POVERTY / $feature.TOTPOP_CY ) * 100",
  legendOptions: {
    title: "% population living in poverty"
  },
  maxDataValue: 45,
  // the max symbol size will map to the minDataValue at an
  // interpolated size depending on the current view scale
  maxSize: {
    type: "size",
    valueExpression: "$view.scale",
    stops: [
      { size: 60, value: 1128 },
      { size: 50, value: 36111 },
      { size: 37.5, value: 43334 },
      { size: 32, value: 15886548 }
    ]
  },
  minDataValue: 15,
  // the min symbol size will map to the minDataValue at an
  // interpolated size depending on the current view scale
  minSize: {
    type: "size",
    valueExpression: "$view.scale",
    stops: [
      { size: 12, value: 1128 },
      { size: 8, value: 36111 },
      { size: 5, value: 43334 },
      { size: 3, value: 15886548 }
    ]
  }
};
renderer.visualVariables = [ sizeVisualVariable ];
```

```javascript
// features will be rendered with a height based on the "Height" attribute field
// and a width and depth based on the "Width_EW" and "Width_NS" attribute fields

const treeSizeVisualVariables = [{
  type: "size",
  axis: "height",
  field: "Height", // tree height
  valueUnit: "feet"
}, {
  type: "size",
  axis: "width",
  field: "Width_EW", // crown diameter from east to west
  valueUnit: "feet"
}, {
  type: "size",
  axis: "depth",
  field: "Width_NS", // crown diameter from north to south
  valueUnit: "feet"
}];
renderer.visualVariables = treeSizeVisualVariables;
```

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

