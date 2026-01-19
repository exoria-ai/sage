# TextSymbol3DLayer

**Module:** `@arcgis/core/symbols/TextSymbol3DLayer`

## Import

```javascript
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";
```

```javascript
// CDN
const TextSymbol3DLayer = await $arcgis.import("@arcgis/core/symbols/TextSymbol3DLayer.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- FeatureLayer
- LabelClass
- Sample - Flat vs. volumetric 3D symbol layers
- Sample - Line markers and label placement
- Sample - Query Elevation (points)

## Property Details

### `TextSymbol3DLayer`

### `background`

### `declaredClass`
- **Type:** `Inherited`

### `font`

### `halo`

### `horizontalAlignment`

### `lineHeight`

### `material`

### `size`

### `text`

### `type`

### `verticalAlignment`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let labelClass = new LabelClass({
  labelExpressionInfo: {
    expression: "$feature.COUNTY" // Text for labels comes from COUNTY field
  },
  symbol: {
    type: "label-3d",  // autocasts as new LabelSymbol3D()
    symbolLayers: [{
      type: "text",  // autocasts as new TextSymbol3DLayer()
      material: { color: [ 49,163,84 ] },
      size: 12  // points
    }]
  }
});
// Add labels to the feature layer
featureLayer.labelsVisible = true;
featureLayer.labelingInfo = [ labelClass ];
```

```javascript
symbolLayer.background = { color: [0, 0, 0, 0.75] };
```

```javascript
symbolLayer.halo = {
 color: [255, 255, 255, 0.8], // autocasts as Color
 size: 2
}
```

```javascript
// CSS color string
symbolLayer.material = {
  color: "dodgerblue"
};
```

```javascript
// HEX string
symbolLayer.material = {
  color: "#33cc33";
}
```

```javascript
// array of RGBA values
symbolLayer.material = {
  color: [51, 204, 51, 0.3];
}
```

