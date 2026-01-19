# CircuitLocation

**Module:** `@arcgis/core/networks/support/CircuitLocation`

## Import

```javascript
import CircuitLocation from "@arcgis/core/networks/support/CircuitLocation.js";
```

```javascript
// CDN
const CircuitLocation = await $arcgis.import("@arcgis/core/networks/support/CircuitLocation.js");
```

**Since:** 4.34

## See Also

- UtilityNetwork
- CircuitManager
- Circuit
- CircuitSection
- Subcircuit
- Telecom domain network

## Property Details

### `CircuitLocation`

### `declaredClass`
- **Type:** `Inherited`

### `firstUnit`

### `globalId`

### `numUnits`

### `sourceId`

### `terminalId`

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

