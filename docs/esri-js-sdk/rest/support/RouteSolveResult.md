# RouteSolveResult

**Module:** `@arcgis/core/rest/support/RouteSolveResult`

## Import

```javascript
import RouteSolveResult from "@arcgis/core/rest/support/RouteSolveResult.js";
```

```javascript
// CDN
const RouteSolveResult = await $arcgis.import("@arcgis/core/rest/support/RouteSolveResult.js");
```

**Since:** 4.23

## See Also

- route
- RouteResult
- RouteParameters
- barriers
- polygonBarriers
- polylineBarriers

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `messages`

### `pointBarriers`

### `polygonBarriers`

### `polylineBarriers`

### `routeResults`

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

