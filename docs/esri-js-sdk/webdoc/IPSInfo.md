# IPSInfo

**Module:** `@arcgis/core/webdoc/IPSInfo`

## Import

```javascript
import IPSInfo from "@arcgis/core/webdoc/IPSInfo.js";
```

```javascript
// CDN
const IPSInfo = await $arcgis.import("@arcgis/core/webdoc/IPSInfo.js");
```

**Since:** 4.31

## Property Details

### `IPSInfo`

### `configuration`

### `declaredClass`
- **Type:** `Inherited`

### `positioningService`

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

