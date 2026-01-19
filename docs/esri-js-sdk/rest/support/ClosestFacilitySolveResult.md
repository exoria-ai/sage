# ClosestFacilitySolveResult

**Module:** `@arcgis/core/rest/support/ClosestFacilitySolveResult`

## Import

```javascript
import ClosestFacilitySolveResult from "@arcgis/core/rest/support/ClosestFacilitySolveResult.js";
```

```javascript
// CDN
const ClosestFacilitySolveResult = await $arcgis.import("@arcgis/core/rest/support/ClosestFacilitySolveResult.js");
```

**Since:** 4.20

## See Also

- closestFacility
- ClosestFacilityParameters
- facilities
- incidents
- barriers
- polygonBarriers
- polylineBarriers
- routes
- traversedEdges
- traversedJunctions
- traversedTurns

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `directionLines`

### `directionPoints`

### `directions`

### `facilities`

### `incidents`

### `messages`

### `pointBarriers`

### `polygonBarriers`

### `polylineBarriers`

### `routes`

### `traversedEdges`

### `traversedJunctions`

### `traversedTurns`

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

