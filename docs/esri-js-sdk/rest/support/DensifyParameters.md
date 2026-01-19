# DensifyParameters

**Module:** `@arcgis/core/rest/support/DensifyParameters`

## Import

```javascript
import DensifyParameters from "@arcgis/core/rest/support/DensifyParameters.js";
```

```javascript
// CDN
const DensifyParameters = await $arcgis.import("@arcgis/core/rest/support/DensifyParameters.js");
```

**Since:** 4.20

## See Also

- geometryService.densify()
- ArcGIS REST API - Densify

## Property Details

### `DensifyParameters`

### `declaredClass`
- **Type:** `Inherited`

### `geodesic`

### `geometries`

### `lengthUnit`

### `maxSegmentLength`

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

