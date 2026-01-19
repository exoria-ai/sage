# Subtype

**Module:** `@arcgis/core/layers/support/Subtype`

## Import

```javascript
import Subtype from "@arcgis/core/layers/support/Subtype.js";
```

```javascript
// CDN
const Subtype = await $arcgis.import("@arcgis/core/layers/support/Subtype.js");
```

**Since:** 4.28

## See Also

- Introduction to subtypes

## Property Details

### `code`

### `declaredClass`
- **Type:** `Inherited`

### `defaultValues`

### `domains`

### `name`

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

