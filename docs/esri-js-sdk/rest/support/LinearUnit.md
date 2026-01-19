# LinearUnit

**Module:** `@arcgis/core/rest/support/LinearUnit`

## Import

```javascript
import LinearUnit from "@arcgis/core/rest/support/LinearUnit.js";
```

```javascript
// CDN
const LinearUnit = await $arcgis.import("@arcgis/core/rest/support/LinearUnit.js");
```

**Since:** 4.0

## Property Details

### `LinearUnit`

### `declaredClass`
- **Type:** `Inherited`

### `distance`

### `units`

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

