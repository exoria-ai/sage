# ImageAngleParameters

**Module:** `@arcgis/core/rest/support/ImageAngleParameters`

## Import

```javascript
import ImageAngleParameters from "@arcgis/core/rest/support/ImageAngleParameters.js";
```

```javascript
// CDN
const ImageAngleParameters = await $arcgis.import("@arcgis/core/rest/support/ImageAngleParameters.js");
```

**Since:** 4.22

## See Also

- ImageryLayer.computeAngles()
- imageService.computeAngles()
- ArcGIS REST API - Compute Angles

## Property Details

### `ImageAngleParameters`

### `angleNames`

### `declaredClass`
- **Type:** `Inherited`

### `point`

### `rasterId`

### `spatialReference`

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

