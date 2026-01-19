# ImageBoundaryParameters

**Module:** `@arcgis/core/rest/support/ImageBoundaryParameters`

## Import

```javascript
import ImageBoundaryParameters from "@arcgis/core/rest/support/ImageBoundaryParameters.js";
```

```javascript
// CDN
const ImageBoundaryParameters = await $arcgis.import("@arcgis/core/rest/support/ImageBoundaryParameters.js");
```

**Since:** 4.29

## See Also

- ImageryLayer.queryBoundary()
- imageService.queryBoundary()

## Property Details

### `ImageBoundaryParameters`

### `declaredClass`
- **Type:** `Inherited`

### `outSpatialReference`

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

