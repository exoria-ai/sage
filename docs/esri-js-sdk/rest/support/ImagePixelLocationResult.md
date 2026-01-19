# ImagePixelLocationResult

**Module:** `@arcgis/core/rest/support/ImagePixelLocationResult`

## Import

```javascript
import ImagePixelLocationResult from "@arcgis/core/rest/support/ImagePixelLocationResult.js";
```

```javascript
// CDN
const ImagePixelLocationResult = await $arcgis.import("@arcgis/core/rest/support/ImagePixelLocationResult.js");
```

**Since:** 4.22

## See Also

- ImageryLayer.computePixelSpaceLocations()
- imageService.computePixelSpaceLocations()
- ImagePixelLocationParameters

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `geometries`

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

