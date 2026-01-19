# Subcircuit

**Module:** `@arcgis/core/networks/support/Subcircuit`

## Import

```javascript
import Subcircuit from "@arcgis/core/networks/support/Subcircuit.js";
```

```javascript
// CDN
const Subcircuit = await $arcgis.import("@arcgis/core/networks/support/Subcircuit.js");
```

**Since:** 4.34

## See Also

- UtilityNetwork
- CircuitManager
- Circuit
- CircuitSection
- CircuitLocation
- Telecom domain network

## Property Details

### `Subcircuit`

### `attributes`

### `consumerId`

### `declaredClass`
- **Type:** `Inherited`

### `globalId`

### `isReserved`

### `name`

### `providerId`

### `addHandles`
- **Type:** `Inherited`

### `getAttribute`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `setAttribute`


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

