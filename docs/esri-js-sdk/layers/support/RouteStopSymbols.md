# RouteStopSymbols

**Module:** `@arcgis/core/layers/support/RouteStopSymbols`

## Import

```javascript
import RouteStopSymbols from "@arcgis/core/layers/support/RouteStopSymbols.js";
```

```javascript
// CDN
const RouteStopSymbols = await $arcgis.import("@arcgis/core/layers/support/RouteStopSymbols.js");
```

**Since:** 4.24

## See Also

- RouteLayer
- RouteSymbols

## Property Details

### `RouteStopSymbols`

### `break`

### `declaredClass`
- **Type:** `Inherited`

### `first`

### `last`

### `middle`

### `unlocated`

### `waypoint`

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

