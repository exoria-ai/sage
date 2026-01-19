# VirtualLighting

**Module:** `@arcgis/core/webscene/VirtualLighting`

## Import

```javascript
import VirtualLighting from "@arcgis/core/webscene/VirtualLighting.js";
```

```javascript
// CDN
const VirtualLighting = await $arcgis.import("@arcgis/core/webscene/VirtualLighting.js");
```

**Since:** 4.24

## See Also

- Environment

## Property Details

### `VirtualLighting`

### `declaredClass`
- **Type:** `Inherited`

### `directShadowsEnabled`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


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

