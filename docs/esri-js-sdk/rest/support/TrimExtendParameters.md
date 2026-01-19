# TrimExtendParameters

**Module:** `@arcgis/core/rest/support/TrimExtendParameters`

## Import

```javascript
import TrimExtendParameters from "@arcgis/core/rest/support/TrimExtendParameters.js";
```

```javascript
// CDN
const TrimExtendParameters = await $arcgis.import("@arcgis/core/rest/support/TrimExtendParameters.js");
```

**Since:** 4.20

## See Also

- geometryService.trimExtend()
- ArcGIS REST API - Trim/Extend

## Property Details

### `TrimExtendParameters`

### `declaredClass`
- **Type:** `Inherited`

### `extendHow`

### `polylines`

### `trimExtendTo`

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

