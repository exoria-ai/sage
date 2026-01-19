# RouteSymbols

**Module:** `@arcgis/core/layers/support/RouteSymbols`

## Import

```javascript
import RouteSymbols from "@arcgis/core/layers/support/RouteSymbols.js";
```

```javascript
// CDN
const RouteSymbols = await $arcgis.import("@arcgis/core/layers/support/RouteSymbols.js");
```

**Since:** 4.24

## See Also

- RouteLayer

## Property Details

### `RouteSymbols`

### `declaredClass`
- **Type:** `Inherited`

### `directionLines`

### `directionPoints`

### `pointBarriers`

### `polygonBarriers`

### `polylineBarriers`

### `routeInfo`

### `stops`

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
// When a route is solved, display the direction lines with a thick cyan line and hide both diection points and the
// overall route line.
const layer = new RouteLayer({
  defaultSymbols: {
   directionLines: {
     type: "simple-line",
     color: [105, 220, 255],
     width: 7,
     cap: "round",
     join: "round"
   },
   directionPoints: null,
   routeInfo: null
  }
});
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

