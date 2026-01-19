# ImageBoundaryResult

**Module:** `@arcgis/core/rest/support/ImageBoundaryResult`

## Import

```javascript
import ImageBoundaryResult from "@arcgis/core/rest/support/ImageBoundaryResult.js";
```

```javascript
// CDN
const ImageBoundaryResult = await $arcgis.import("@arcgis/core/rest/support/ImageBoundaryResult.js");
```

**Since:** 4.29

## See Also

- ImageryLayer.queryBoundary()
- imageService.queryBoundary()

## Property Details

### `area`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

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

