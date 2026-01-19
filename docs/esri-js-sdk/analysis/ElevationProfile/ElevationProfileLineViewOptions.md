# ElevationProfileLineViewOptions

**Module:** `@arcgis/core/analysis/ElevationProfile/ElevationProfileLineViewOptions`

## Import

```javascript
import ElevationProfileLineViewOptions from "@arcgis/core/analysis/ElevationProfile/ElevationProfileLineViewOptions.js";
```

```javascript
// CDN
const ElevationProfileLineViewOptions = await $arcgis.import("@arcgis/core/analysis/ElevationProfile/ElevationProfileLineViewOptions.js");
```

**Since:** 4.34

## See Also

- ElevationProfileAnalysis
- ElevationProfileViewOptions
- ElevationProfileLineChartOptions
- ElevationProfileAnalysisView2D.hoveredPoints
- ElevationProfileAnalysisView3D.hoveredPoints

## Property Details

### `ElevationProfileLineViewOptions`

### `declaredClass`
- **Type:** `Inherited`

### `hoveredPointVisible`

### `lineVisible`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


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

