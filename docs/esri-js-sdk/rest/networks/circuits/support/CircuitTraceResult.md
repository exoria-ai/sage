# CircuitTraceResult

**Module:** `@arcgis/core/rest/networks/circuits/support/CircuitTraceResult`

## Import

```javascript
import CircuitTraceResult from "@arcgis/core/rest/networks/circuits/support/CircuitTraceResult.js";
```

```javascript
// CDN
const CircuitTraceResult = await $arcgis.import("@arcgis/core/rest/networks/circuits/support/CircuitTraceResult.js");
```

**Since:** 4.34

## Property Details

### `circuit`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `path`

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

