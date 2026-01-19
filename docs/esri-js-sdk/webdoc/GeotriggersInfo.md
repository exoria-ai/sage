# GeotriggersInfo

**Module:** `@arcgis/core/webdoc/GeotriggersInfo`

## Import

```javascript
import GeotriggersInfo from "@arcgis/core/webdoc/GeotriggersInfo.js";
```

```javascript
// CDN
const GeotriggersInfo = await $arcgis.import("@arcgis/core/webdoc/GeotriggersInfo.js");
```

**Since:** 4.24

## Property Details

### `GeotriggersInfo`

### `declaredClass`
- **Type:** `Inherited`

### `geotriggers`

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

