# ClassBreaksRenderer

**Module:** `@arcgis/core/renderers/ClassBreaksRenderer`

## Import

```javascript
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
```

```javascript
// CDN
const ClassBreaksRenderer = await $arcgis.import("@arcgis/core/renderers/ClassBreaksRenderer.js");
```

**Since:** 4.0

## See Also

- Sample - Visualize data with class breaks
- Guide - Esri color ramps
- Guide - Visualization best practices
- Arcade Visualization Profile
- Styles and data visualization

## Property Details

### `ClassBreaksRenderer`

### `authoringInfo`
- **Type:** `Inherited`

### `backgroundFillSymbol`

### `classBreakInfos`

### `declaredClass`
- **Type:** `Inherited`

### `defaultLabel`

### `defaultSymbol`

### `field`

### `legendOptions`

### `normalizationField`

### `normalizationTotal`

### `normalizationType`

### `type`

### `valueExpression`

### `valueExpressionTitle`

### `visualVariables`

### `addClassBreakInfo`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `getClassBreakInfo`

### `hasHandles`
- **Type:** `Inherited`

### `removeClassBreakInfo`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let renderer = new ClassBreaksRenderer({
  // attribute of interest - Earthquake magnitude
  field: "MAGNITUDE"
});
// All features with magnitude between 0 - 4.0
renderer.addClassBreakInfo({
  minValue: 0,
  maxValue: 4.0,
  symbol: {
    type: "point-3d",  // autocasts as new PointSymbol3D()
    symbolLayers: [{
      type: "object",  // autocasts as new ObjectSymbol3DLayer()
      resource: { primitive: "cone" },
      material: { color: [0, 169, 230] },
      height: 200000,
      width: 50000
    }]
  }
});
// All features with magnitude between 4.1 - 7.0
renderer.addClassBreakInfo({
  minValue: 4.1,
  maxValue: 7.0,
  symbol: {
    type: "point-3d",  // autocasts as new PointSymbol3D()
    symbolLayers: [{
      type: "object",  // autocasts as new ObjectSymbol3DLayer()
      resource: { primitive: "cone" },
      material: { color: [230, 230, 0] },
      height: 800000,
      width: 90000
    }]
  }
});
// All features with magnitude between 7.1 - 10.0
renderer.addClassBreakInfo({
  minValue: 7.1,
  maxValue: 10.0,
  symbol: {
    type: "point-3d",  // autocasts as new PointSymbol3D()
    symbolLayers: [{
      type: "object",  // autocasts as new ObjectSymbol3DLayer()
      resource: { primitive: "cone" },
      material: { color: [230, 0, 0] },
      height: 3200000,
      width: 130000
    }]
  }
});

let layer = new FeatureLayer({
  url: "http://url.to.service",
  renderer: renderer
});
```

```javascript
// Typical usage
let renderer = {
  type: "class-breaks",  // autocasts as new ClassBreaksRenderer()
  field: "fieldName",
  classBreakInfos: [ ... ]
};
```

```javascript
// this symbol will be applied to all features. It is only
// necessary when visualizing polygon data with icons.
renderer.backgroundFillSymbol = {
  type: "simple-fill",
  outline: {
    width: 1,
    color: "gray"
  }
};
```

```javascript
let renderer = {
  type: "class-breaks",  // autocasts as new ClassBreaksRenderer()
  field: "HARVESTED_ACRES",
  classBreakInfos: [
    {
      minValue: 0,  // 0 acres
      maxValue: 200000,  // 200,000 acres
      symbol: sym1,  // will be assigned sym1
      label: "fewer than 200,000 acres"
    }, {
      minValue: 200001,  // 200,001 acres
      maxValue: 500000,  // 500,000 acres
      symbol: sym2,  // will be assigned sym2
      label: "200,000 - 500,000 acres"
    }, {
      minValue: 500001,  // 500,001 acres
      maxValue: 750000,  // 750,000 acres
      symbol: sym3,  // will be assigned sym2
      label: "more than 500,000 acres"
    }
  ]
};
```

```javascript
let renderer = {
  type: "class-breaks",  // autocasts as new ClassBreaksRenderer()
  field: "totalAcres",  // values returned by this field will
                        // be used to render features
  classBreakInfos: [
    {
      minValue: 0,  // 0 acres
      maxValue: 200000,  // 200,000 acres
      symbol: sym1  // will be assigned sym1
    }, {
      minValue: 200001,  // 200,001 acres
      maxValue: 500000,  // 500,000 acres
      symbol: sym2  // will be assigned sym2
    }, {
      minValue: 500001,  // 500,001 acres
      maxValue: 750000,  // 750,000 acres
      symbol: sym3  // will be assigned sym2
    }
  ]
};
```

```javascript
renderer.legendOptions = {
  title: "Population density",
  order: "descending-values",
};
```

