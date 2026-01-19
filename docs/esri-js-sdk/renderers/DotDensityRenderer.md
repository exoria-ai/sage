# DotDensityRenderer

**Module:** `@arcgis/core/renderers/DotDensityRenderer`

## Import

```javascript
import DotDensityRenderer from "@arcgis/core/renderers/DotDensityRenderer.js";
```

```javascript
// CDN
const DotDensityRenderer = await $arcgis.import("@arcgis/core/renderers/DotDensityRenderer.js");
```

**Since:** 4.11

## See Also

- Sample - Dot Density
- Guide - Esri color ramps
- Guide - Visualization best practices
- Arcade Visualization Profile

## Property Details

### `DotDensityRenderer`

### `attributes`

### `authoringInfo`
- **Type:** `Inherited`

### `backgroundColor`

### `declaredClass`
- **Type:** `Inherited`

### `dotBlendingEnabled`

### `dotSize`

### `dotValue`

### `legendOptions`

### `outline`

### `referenceScale`

### `seed`

### `type`

### `visualVariables`

### `addHandles`
- **Type:** `Inherited`

### `calculateDotValue`

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
layer.renderer = {
  type: "dot-density",  // autocasts as new DotDensityRenderer()
  dotValue: 1000,  // 1 dot = 1,000 people when the view.scale is 1:1,000,000
  referenceScale: 1000000,  // view.scale
  attributes: [{
    field: "ELEMENTARY_SCHOOL",
    label: "Elementary School",
    color: "red"
  }, {
    field: "MIDDLE_SCHOOL",
    label: "Middle School",
    color: "blue"
  }, {
    field: "HIGH_SCHOOL",
    label: "High School",
    color: "orange"
  }, {
    valueExpression: "$feature.ASSOCIATES_DEGREE + $feature.BACHELOR_DEGREE + $feature.MASTER_DEGREE + $feature.DOCTORATE_DEGREE",
    valueExpressionTitle: "People who completed university",
    label: "University"
    color: "green"
  }]
}
```

```javascript
// Typical usage
let renderer = {
  type: "dot-density",  // autocasts as new DotDensityRenderer()
  dotValue: 1000,
  legendOptions: {
    unit: "people"
  },
  attributes: [{
    field: "Population",
    color: "yellow"
  }]
};
```

```javascript
renderer.attributes = [{
  field: "POPULATION",
  label: "Population (2019)",
  color: "gray"
}];
```

```javascript
// CSS color string
renderer.backgroundColor = "dodgerblue";
```

```javascript
// HEX string
renderer.backgroundColor = "#33cc33";
```

```javascript
// array of RGBA values
renderer.backgroundColor = [51, 204, 51, 0.3];
```

