# ImageDistanceResult

**Module:** `@arcgis/core/rest/support/ImageDistanceResult`

## Import

```javascript
import ImageDistanceResult from "@arcgis/core/rest/support/ImageDistanceResult.js";
```

```javascript
// CDN
const ImageDistanceResult = await $arcgis.import("@arcgis/core/rest/support/ImageDistanceResult.js");
```

**Since:** 4.26

## See Also

- ImageryLayer.measureDistanceAndAngle()
- imageService.measureDistanceAndAngle()
- ImageDistanceParameters

## Property Details

### `azimuthAngle`

### `declaredClass`
- **Type:** `Inherited`

### `distance`

### `elevationAngle`

### `name`
- **Type:** `Inherited`

### `sensorName`
- **Type:** `Inherited`

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

