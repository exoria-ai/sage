# RasterStretchRenderer

**Module:** `@arcgis/core/renderers/RasterStretchRenderer`

## Import

```javascript
import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer.js";
```

```javascript
// CDN
const RasterStretchRenderer = await $arcgis.import("@arcgis/core/renderers/RasterStretchRenderer.js");
```

**Since:** 4.12

## See Also

- Sample - Intro to ImageryTileLayer
- Learn about the contrast stretches to improve the display
- Learn how to use the Stretched renderer
- ImageryLayer rendering
- Learn about calculating statistics

## Property Details

### `RasterStretchRenderer`

### `colorRamp`

### `computeGamma`

### `customStatistics`

### `declaredClass`
- **Type:** `Inherited`

### `dynamicRangeAdjustment`

### `gamma`

### `maxPercent`

### `minPercent`

### `numberOfStandardDeviations`

### `outputMax`

### `outputMin`

### `sigmoidStrengthLevel`

### `stretchType`

### `type`

### `useGamma`

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
for single band stretch
const bandStat = layer.rasterInfo.statistics[0];
const renderer = new RasterStretchRenderer();
renderer.stretchType = "min-max";
renderer.customStatistics = [{
  min: valueSlider.values[0],
  max: valueSlider.values[1],
  avg: bandStat.avg,
  stddev: bandStat.stddev
}];
```

```javascript
for RGB (e.g. layer.bandIds = [3,2,1])
const stats = layer.rasterInfo.statistics;
const bandIds = layer.bandIds;
const renderer = new RasterStretchRenderer();
renderer.stretchType = "min-max";
renderer.customStatistics = [{
  min: redSlider.values[0],
  max: redSlider.values[1],
  avg: stats[bandIds[0]].avg,
  stddev: stats[bandIds[0]].stddev,
}, {
  min: greenSlider.values[0],
  max: greenSlider.values[1],
  avg: stats[bandIds[1]].avg,
  stddev: stats[bandIds[1]].stddev,
}, {
  min: valueSlider.values[0],
  max: valueSlider.values[1],
  avg: stats[bandIds[2]].avg,
  stddev: stats[bandIds[2]].stddev
}];
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
// Creates a deep clone of the first layer's renderer
let renderer = view.map.layers.at(0).renderer.clone();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

