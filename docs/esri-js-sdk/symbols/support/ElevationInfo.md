# ElevationInfo

**Module:** `@arcgis/core/symbols/support/ElevationInfo`

## Import

```javascript
import ElevationInfo from "@arcgis/core/symbols/support/ElevationInfo.js";
```

```javascript
// CDN
const ElevationInfo = await $arcgis.import("@arcgis/core/symbols/support/ElevationInfo.js");
```

**Since:** 4.34

## Property Details

### `ElevationInfo`

### `declaredClass`
- **Type:** `Inherited`

### `featureExpressionInfo`

### `mode`

### `offset`

### `unit`

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

