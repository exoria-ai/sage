# AggregatedGeometry

**Module:** `@arcgis/core/rest/networks/support/AggregatedGeometry`

## Import

```javascript
import AggregatedGeometry from "@arcgis/core/rest/networks/support/AggregatedGeometry.js";
```

```javascript
// CDN
const AggregatedGeometry = await $arcgis.import("@arcgis/core/rest/networks/support/AggregatedGeometry.js");
```

**Since:** 4.20

## See Also

- trace

## Property Details

### `AggregatedGeometry`

### `declaredClass`
- **Type:** `Inherited`

### `line`

### `multipoint`

### `polygon`

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

