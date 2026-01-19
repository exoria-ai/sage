# ElevationProfileLine

**Module:** `@arcgis/core/analysis/ElevationProfile/ElevationProfileLine`

## Import

```javascript
import ElevationProfileLine from "@arcgis/core/analysis/ElevationProfile/ElevationProfileLine.js";
```

```javascript
// CDN
const ElevationProfileLine = await $arcgis.import("@arcgis/core/analysis/ElevationProfile/ElevationProfileLine.js");
```

**Since:** 4.34

## See Also

- ElevationProfileAnalysis
- ElevationProfileLineGround
- ElevationProfileLineInput
- ElevationProfileLineQuery
- ElevationProfileLineScene

## Property Details

### `chartOptions`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `enabled`

### `id`

### `title`

### `type`

### `viewOptions`

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

