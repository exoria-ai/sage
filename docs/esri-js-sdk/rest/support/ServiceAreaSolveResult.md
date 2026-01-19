# ServiceAreaSolveResult

**Module:** `@arcgis/core/rest/support/ServiceAreaSolveResult`

## Import

```javascript
import ServiceAreaSolveResult from "@arcgis/core/rest/support/ServiceAreaSolveResult.js";
```

```javascript
// CDN
const ServiceAreaSolveResult = await $arcgis.import("@arcgis/core/rest/support/ServiceAreaSolveResult.js");
```

**Since:** 4.0

## See Also

- serviceArea
- ServiceAreaParameters
- facilities
- barriers
- polygonBarriers
- polylineBarriers
- saPolygons
- saPolylines

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `facilities`

### `messages`

### `pointBarriers`

### `polygonBarriers`

### `polylineBarriers`

### `serviceAreaPolygons`

### `serviceAreaPolylines`

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

