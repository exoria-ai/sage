# HeatmapRenderer

**Module:** `@arcgis/core/renderers/HeatmapRenderer`

## Import

```javascript
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer.js";
```

```javascript
// CDN
const HeatmapRenderer = await $arcgis.import("@arcgis/core/renderers/HeatmapRenderer.js");
```

**Since:** 4.8

## See Also

- Sample - Visualize points with a heatmap
- Sample - Create a scale-dependent visualization
- Sample - Visualize points in a scene with a heatmap
- Sample - Create a static heatmap
- heatmapRendererCreator
- Sample - Create a static heatmap
- Arcade Visualization Profile
- valueExpressionTitle
- valueExpression

## Property Details

### `HeatmapRenderer`

### `authoringInfo`
- **Type:** `Inherited`

### `colorStops`

### `declaredClass`
- **Type:** `Inherited`

### `field`

### `legendOptions`

### `maxDensity`

### `minDensity`

### `radius`

### `referenceScale`

### `type`

### `valueExpression`

### `valueExpressionTitle`

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
  type: "heatmap",
  field: "crime_count",
  colorStops: [
    { ratio: 0, color: "rgba(255, 255, 255, 0)" },
    { ratio: 0.2, color: "rgba(255, 255, 255, 1)" },
    { ratio: 0.5, color: "rgba(255, 140, 0, 1)" },
    { ratio: 0.8, color: "rgba(255, 140, 0, 1)" },
    { ratio: 1, color: "rgba(255, 0, 0, 1)" }
  ],
  minDensity: 0,
  maxDensity: 500,
  radius: 10
};
```

```javascript
[
  { ratio: 0, color: "rgba(255, 140, 0, 0)" },
  { ratio: 0.75, color: "rgba(255, 140, 0, 1)" },
  { ratio: 0.9, color: "rgba(255, 0,   0, 1)" }
]
```

```javascript
renderer.legendOptions = {
  title: "Car crashes",
  minLabel: "Few crashes",
  maxLabel: "Frequent crashes"
};
```

