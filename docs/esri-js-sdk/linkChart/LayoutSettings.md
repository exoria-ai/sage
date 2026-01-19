# LayoutSettings

**Module:** `@arcgis/core/linkChart/LayoutSettings`

## Import

```javascript
import LayoutSettings from "@arcgis/core/linkChart/LayoutSettings.js";
```

```javascript
// CDN
const LayoutSettings = await $arcgis.import("@arcgis/core/linkChart/LayoutSettings.js");
```

**Since:** 4.32

## See Also

- Web Map Specification | Link chart layout settings

## Property Details

### `LayoutSettings`

### `chronologicalLayoutSettings`

### `declaredClass`
- **Type:** `Inherited`

### `organicLayoutSettings`

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

