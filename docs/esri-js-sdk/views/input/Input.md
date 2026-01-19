# Input

**Module:** `@arcgis/core/views/input/Input`

## Import

```javascript
import Input from "@arcgis/core/views/input/Input.js";
```

```javascript
// CDN
const Input = await $arcgis.import("@arcgis/core/views/input/Input.js");
```

**Since:** 4.9

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `gamepad`

### `addHandles`
- **Type:** `Inherited`

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

