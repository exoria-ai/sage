# RouteResult

**Module:** `@arcgis/core/rest/support/RouteResult`

## Import

```javascript
import RouteResult from "@arcgis/core/rest/support/RouteResult.js";
```

```javascript
// CDN
const RouteResult = await $arcgis.import("@arcgis/core/rest/support/RouteResult.js");
```

**Since:** 4.0

## See Also

- route
- RouteParameters
- RouteSolveResult
- esri/rest/widgets/Directions
- Output parameters
- routes
- RouteParameters.returnStops
- stops
- traversedEdges
- traversedJunctions
- traversedTurns

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `directionLines`

### `directionPoints`

### `directions`

### `route`

### `routeName`

### `stops`

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

