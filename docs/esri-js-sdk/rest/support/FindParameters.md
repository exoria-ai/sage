# FindParameters

**Module:** `@arcgis/core/rest/support/FindParameters`

## Import

```javascript
import FindParameters from "@arcgis/core/rest/support/FindParameters.js";
```

```javascript
// CDN
const FindParameters = await $arcgis.import("@arcgis/core/rest/support/FindParameters.js");
```

**Since:** 4.20

## See Also

- find
- FindResult

## Property Details

### `FindParameters`

### `contains`

### `declaredClass`
- **Type:** `Inherited`

### `gdbVersion`

### `geometryPrecision`

### `layerIds`

### `maxAllowableOffset`

### `outSpatialReference`

### `returnGeometry`

### `searchFields`

### `searchText`

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

