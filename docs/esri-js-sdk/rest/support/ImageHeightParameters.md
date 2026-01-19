# ImageHeightParameters

**Module:** `@arcgis/core/rest/support/ImageHeightParameters`

## Import

```javascript
import ImageHeightParameters from "@arcgis/core/rest/support/ImageHeightParameters.js";
```

```javascript
// CDN
const ImageHeightParameters = await $arcgis.import("@arcgis/core/rest/support/ImageHeightParameters.js");
```

**Since:** 4.26

## See Also

- ImageryLayer.measureHeight()
- imageService.measureHeight()
- ImageHeightResult

## Property Details

### `ImageHeightParameters`

### `declaredClass`
- **Type:** `Inherited`

### `fromGeometry`

### `linearUnit`

### `mosaicRule`
- **Type:** `Inherited`

### `operationType`

### `pixelSize`
- **Type:** `Inherited`

### `toGeometry`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


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

