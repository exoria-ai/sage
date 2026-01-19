# ElevationProfileViewOptions

**Module:** `@arcgis/core/analysis/ElevationProfile/ElevationProfileViewOptions`

## Import

```javascript
import ElevationProfileViewOptions from "@arcgis/core/analysis/ElevationProfile/ElevationProfileViewOptions.js";
```

```javascript
// CDN
const ElevationProfileViewOptions = await $arcgis.import("@arcgis/core/analysis/ElevationProfile/ElevationProfileViewOptions.js");
```

**Since:** 4.34

## See Also

- ElevationProfileAnalysis
- ElevationProfileLineViewOptions
- ElevationProfileLineChartOptions

## Property Details

### `ElevationProfileViewOptions`

### `declaredClass`
- **Type:** `Inherited`

### `geometryVisualizationVisible`

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

