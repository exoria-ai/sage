# DistanceParameters

**Module:** `@arcgis/core/rest/support/DistanceParameters`

## Import

```javascript
import DistanceParameters from "@arcgis/core/rest/support/DistanceParameters.js";
```

```javascript
// CDN
const DistanceParameters = await $arcgis.import("@arcgis/core/rest/support/DistanceParameters.js");
```

**Since:** 4.20

## See Also

- geometryService.distance()
- ArcGIS REST API - Distance

## Property Details

### `DistanceParameters`

### `declaredClass`
- **Type:** `Inherited`

### `distanceUnit`

### `geodesic`

### `geometry1`

### `geometry2`

### `addHandles`
- **Type:** `Inherited`

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

