# TerminalConfiguration

**Module:** `@arcgis/core/networks/support/TerminalConfiguration`

## Import

```javascript
import TerminalConfiguration from "@arcgis/core/networks/support/TerminalConfiguration.js";
```

```javascript
// CDN
const TerminalConfiguration = await $arcgis.import("@arcgis/core/networks/support/TerminalConfiguration.js");
```

**Since:** 4.20

## See Also

- Learn more about terminal management
- UtilityNetwork

## Property Details

### `TerminalConfiguration`

### `declaredClass`
- **Type:** `Inherited`

### `defaultConfiguration`

### `id`

### `name`

### `terminals`

### `traversabilityModel`

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

