# ChronologicalLayoutSettings

**Module:** `@arcgis/core/linkChart/ChronologicalLayoutSettings`

## Import

```javascript
import ChronologicalLayoutSettings from "@arcgis/core/linkChart/ChronologicalLayoutSettings.js";
```

```javascript
// CDN
const ChronologicalLayoutSettings = await $arcgis.import("@arcgis/core/linkChart/ChronologicalLayoutSettings.js");
```

**Since:** 4.32

## Property Details

### `ChronologicalLayoutSettings`

### `declaredClass`
- **Type:** `Inherited`

### `durationLineWidth`

### `entityPositionAtDurationRatio`

### `eventsTicksVisualization`

### `lineSeparationMultiplier`

### `moveFirstBends`

### `secondBendRatio`

### `separateTimeOverlaps`

### `separateTimelineOverlaps`

### `separatedLineShapeRatio`

### `showDurationLineForNonZeroDurationEntityEvents`

### `showNonZeroDurationIntervalBounds`

### `spaceSeparatedLinesEvenly`

### `timeBannerUTCOffsetInMinutes`

### `timeDirection`

### `useBezierCurves`

### `addHandles`
- **Type:** `Inherited`

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

