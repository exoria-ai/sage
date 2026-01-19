# PolylineBarrier

**Module:** `@arcgis/core/rest/support/PolylineBarrier`

## Import

```javascript
import PolylineBarrier from "@arcgis/core/rest/support/PolylineBarrier.js";
```

```javascript
// CDN
const PolylineBarrier = await $arcgis.import("@arcgis/core/rest/support/PolylineBarrier.js");
```

**Since:** 4.23

## See Also

- RouteParameters
- RouteLayer
- BarrierType

## Property Details

### `PolylineBarrier`

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
// Print the number of polyline barriers.
const routeLayer = new RouteLayer({
  portalItem: {
    id: "69569b47b1e445b8a42ec12feab41ce9"
  }
});
await routeLayer.load();

const count = routeLayer.polylineBarriers.length;
console.log(`The route contains ${count} linear barriers`);
// output: "The route contains 2 linear barriers"

// Zoom to first barrier
view.goTo(routeLayer.polylineBarriers[0].geometry)
```

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

