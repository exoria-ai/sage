# Geotrigger

**Module:** `@arcgis/core/webdoc/geotriggersInfo/Geotrigger`

## Import

```javascript
import Geotrigger from "@arcgis/core/webdoc/geotriggersInfo/Geotrigger.js";
```

```javascript
// CDN
const Geotrigger = await $arcgis.import("@arcgis/core/webdoc/geotriggersInfo/Geotrigger.js");
```

**Since:** 4.24

## Property Details

### `Geotrigger`

### `declaredClass`
- **Type:** `Inherited`

### `type`

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

