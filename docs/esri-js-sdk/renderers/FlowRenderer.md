# FlowRenderer

**Module:** `@arcgis/core/renderers/FlowRenderer`

## Import

```javascript
import FlowRenderer from "@arcgis/core/renderers/FlowRenderer.js";
```

```javascript
// CDN
const FlowRenderer = await $arcgis.import("@arcgis/core/renderers/FlowRenderer.js");
```

**Since:** 4.23

## See Also

- Sample - FlowRenderer
- Sample - FlowRenderer with Blending and Effects
- Sample - FlowRenderer in a 3D scene
- Sample - FlowRenderer with elevation modes
- Styles and data visualization

## Property Details

### `FlowRenderer`

### `authoringInfo`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `density`

### `flowRepresentation`

### `flowSpeed`

### `legendOptions`

### `maxPathLength`

### `trailCap`

### `trailLength`

### `trailWidth`

### `type`

### `visualVariables`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
const renderer = new FlowRenderer({
  density: 1,
  color: [50, 120, 240], // blue
  flowSpeed: 10,
  trailWidth: "2px"
});
```

```javascript
let renderer = {
  type: "flow",
  color: [50, 120, 240, 1]
}
```

```javascript
renderer.legendOptions = {
  title: "Wind speed",
  order: "descending-values",
};
```

```javascript
// width in points
flowRenderer.maxPathLength = 100;
```

```javascript
// width in pixels
flowRenderer.maxPathLength = "200px";
```

```javascript
// width in points
flowRenderer.maxPathLength = "100pt";
```

