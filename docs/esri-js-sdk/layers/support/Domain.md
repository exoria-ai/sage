# Domain

**Module:** `@arcgis/core/layers/support/Domain`

## Import

```javascript
import Domain from "@arcgis/core/layers/support/Domain.js";
```

```javascript
// CDN
const Domain = await $arcgis.import("@arcgis/core/layers/support/Domain.js");
```

**Since:** 4.0

## See Also

- Field

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `name`

### `type`

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

