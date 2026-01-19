# ColormapInfo

**Module:** `@arcgis/core/renderers/support/ColormapInfo`

## Import

```javascript
import ColormapInfo from "@arcgis/core/renderers/support/ColormapInfo.js";
```

```javascript
// CDN
const ColormapInfo = await $arcgis.import("@arcgis/core/renderers/support/ColormapInfo.js");
```

**Since:** 4.16

## Property Details

### `ColormapInfo`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `label`

### `value`

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

