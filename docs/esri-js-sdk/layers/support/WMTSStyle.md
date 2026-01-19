# WMTSStyle

**Module:** `@arcgis/core/layers/support/WMTSStyle`

## Import

```javascript
import WMTSStyle from "@arcgis/core/layers/support/WMTSStyle.js";
```

```javascript
// CDN
const WMTSStyle = await $arcgis.import("@arcgis/core/layers/support/WMTSStyle.js");
```

**Since:** 4.4

## Property Details

### `WMTSStyle`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `id`

### `legendUrl`

### `title`

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

