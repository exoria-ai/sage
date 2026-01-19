# Terminal

**Module:** `@arcgis/core/networks/support/Terminal`

## Import

```javascript
import Terminal from "@arcgis/core/networks/support/Terminal.js";
```

```javascript
// CDN
const Terminal = await $arcgis.import("@arcgis/core/networks/support/Terminal.js");
```

**Since:** 4.20

## See Also

- Learn more about terminal management
- UtilityNetwork

## Property Details

### `Terminal`

### `declaredClass`
- **Type:** `Inherited`

### `id`

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

