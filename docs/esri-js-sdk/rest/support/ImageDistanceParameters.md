# ImageDistanceParameters

**Module:** `@arcgis/core/rest/support/ImageDistanceParameters`

## Import

```javascript
import ImageDistanceParameters from "@arcgis/core/rest/support/ImageDistanceParameters.js";
```

```javascript
// CDN
const ImageDistanceParameters = await $arcgis.import("@arcgis/core/rest/support/ImageDistanceParameters.js");
```

**Since:** 4.26

## See Also

- ImageryLayer.measureDistanceAndAngle()
- imageService.measureDistanceAndAngle()
- ImageDistanceResult

## Property Details

### `ImageDistanceParameters`

### `angularUnit`

### `declaredClass`
- **Type:** `Inherited`

### `fromGeometry`

### `is3D`

### `linearUnit`

### `mosaicRule`
- **Type:** `Inherited`

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

