# PointBarrier

**Module:** `@arcgis/core/rest/support/PointBarrier`

## Import

```javascript
import PointBarrier from "@arcgis/core/rest/support/PointBarrier.js";
```

```javascript
// CDN
const PointBarrier = await $arcgis.import("@arcgis/core/rest/support/PointBarrier.js");
```

**Since:** 4.23

## See Also

- RouteParameters
- RouteLayer
- BarrierType
- CurbApproach

## Property Details

### `PointBarrier`

### `barrierType`

### `curbApproach`

### `declaredClass`
- **Type:** `Inherited`

### `fullEdge`

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

