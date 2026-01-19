# PolygonBarrier

**Module:** `@arcgis/core/rest/support/PolygonBarrier`

## Import

```javascript
import PolygonBarrier from "@arcgis/core/rest/support/PolygonBarrier.js";
```

```javascript
// CDN
const PolygonBarrier = await $arcgis.import("@arcgis/core/rest/support/PolygonBarrier.js");
```

**Since:** 4.23

## See Also

- RouteParameters
- RouteLayer
- BarrierType

## Property Details

### `PolygonBarrier`

### `barrierType`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `name`

### `popupTemplate`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `fromGraphic`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toGraphic`

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

