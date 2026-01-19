# CircuitPathConnectivityElement

**Module:** `@arcgis/core/networks/support/CircuitPathConnectivityElement`

## Import

```javascript
import CircuitPathConnectivityElement from "@arcgis/core/networks/support/CircuitPathConnectivityElement.js";
```

```javascript
// CDN
const CircuitPathConnectivityElement = await $arcgis.import("@arcgis/core/networks/support/CircuitPathConnectivityElement.js");
```

**Since:** 4.34

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `edgeElement`

### `junctionElement`

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

