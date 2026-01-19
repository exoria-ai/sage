# PieChartRenderer

**Module:** `@arcgis/core/renderers/PieChartRenderer`

## Import

```javascript
import PieChartRenderer from "@arcgis/core/renderers/PieChartRenderer.js";
```

```javascript
// CDN
const PieChartRenderer = await $arcgis.import("@arcgis/core/renderers/PieChartRenderer.js");
```

**Since:** 4.24

## See Also

- Sample - pie charts
- Arcade Visualization Profile
- defaultLabel

## Property Details

### `PieChartRenderer`

### `attributes`

### `authoringInfo`
- **Type:** `Inherited`

### `backgroundFillSymbol`

### `declaredClass`
- **Type:** `Inherited`

### `defaultColor`

### `defaultLabel`

### `holePercentage`

### `legendOptions`

### `othersCategory`

### `outline`

### `size`

### `type`

### `visualVariables`

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
layer.renderer = {
  type: "pie-chart",  // autocasts as new PieChartRenderer()
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
};
```

```javascript
renderer.attributes = [{
  field: "English",
  label: "English speakers",
  color: "red"
}, {
  field: "Spanish",
  label: "Spanish speakers",
  color: "blue"
}, {
  field: "Other",
  label: "All other languages",
  color: "brown"
}];
```

```javascript
renderer.backgroundFillSymbol = {
  color: [51, 204, 51, 0.3],
  outline: {
    width: 1,
    color: [255,255,255,0.3]
  }
};
```

```javascript
renderer.defaultColor = "lightgray";
```

```javascript
renderer.defaultLabel = "No data";
```

