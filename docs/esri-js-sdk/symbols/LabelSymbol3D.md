# LabelSymbol3D

**Module:** `@arcgis/core/symbols/LabelSymbol3D`

## Import

```javascript
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D.js";
```

```javascript
// CDN
const LabelSymbol3D = await $arcgis.import("@arcgis/core/symbols/LabelSymbol3D.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- FeatureLayer
- LabelClass
- Sample - Flat vs. volumetric 3D symbol layers
- Sample - Line markers and label placement
- Sample: Using callout lines with labels
- Sample: Using callout lines with labels

## Property Details

### `LabelSymbol3D`

### `callout`

### `declaredClass`
- **Type:** `Inherited`

### `symbolLayers`

### `type`

### `verticalOffset`

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
    expression: "$feature.COUNTY"  // Text for labels comes from COUNTY field
  },
  symbol: {
    type: "label-3d",  // autocasts as new LabelSymbol3D()
    symbolLayers: [{
      type: "text",  // autocasts as new TextSymbol3DLayer()
      material: { color: [ 49,163,84 ] },
      size: 12  // Defined in points
    }]
  }
});
// Add labels to the feature layer
featureLayer.labelsVisible = true;
featureLayer.labelingInfo = [ labelClass ];
```

```javascript
let symbol = {
  type: "label-3d",  // autocasts as new LabelSymbol3D()
  symbolLayers: [...],
  verticalOffset: ...,
  callout: {
    type: "line",  // autocasts as new LineCallout3D()
    size: 1.5,
    color: [150, 150, 150],
    border: {
      color: [50, 50, 50]
    }
  }
};
```

```javascript
let symbol = {
  type: "label-3d",  // autocasts as new LabelSymbol3D()
  symbolLayers: [...],
  verticalOffset: {
    screenLength: 40,
    maxWorldLength: 100,
    minWorldLength: 20
  },
  callout: ...
};
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

```javascript
// Creates a deep clone of the graphic's symbol
let symLyr = graphic.symbol.clone();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

