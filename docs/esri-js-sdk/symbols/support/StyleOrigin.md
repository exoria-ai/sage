# StyleOrigin

**Module:** `@arcgis/core/symbols/support/StyleOrigin`

## Import

```javascript
import StyleOrigin from "@arcgis/core/symbols/support/StyleOrigin.js";
```

```javascript
// CDN
const StyleOrigin = await $arcgis.import("@arcgis/core/symbols/support/StyleOrigin.js");
```

## Property Details

### `StyleOrigin`

### `declaredClass`
- **Type:** `Inherited`

### `name`

### `portal`

### `styleName`

### `styleUrl`

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

