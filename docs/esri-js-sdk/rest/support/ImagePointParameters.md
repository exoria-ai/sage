# ImagePointParameters

**Module:** `@arcgis/core/rest/support/ImagePointParameters`

## Import

```javascript
import ImagePointParameters from "@arcgis/core/rest/support/ImagePointParameters.js";
```

```javascript
// CDN
const ImagePointParameters = await $arcgis.import("@arcgis/core/rest/support/ImagePointParameters.js");
```

**Since:** 4.26

## See Also

- ImageryLayer.measurePointOrCentroid()
- imageService.measurePointOrCentroid()
- ImagePointResult

## Property Details

### `ImagePointParameters`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `is3D`

### `mosaicRule`
- **Type:** `Inherited`

### `pixelSize`
- **Type:** `Inherited`

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

