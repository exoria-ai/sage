# ImagePointResult

**Module:** `@arcgis/core/rest/support/ImagePointResult`

## Import

```javascript
import ImagePointResult from "@arcgis/core/rest/support/ImagePointResult.js";
```

```javascript
// CDN
const ImagePointResult = await $arcgis.import("@arcgis/core/rest/support/ImagePointResult.js");
```

**Since:** 4.26

## See Also

- ImageryLayer.measurePointOrCentroid()
- imageService.measurePointOrCentroid()
- ImagePointParameters

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `name`
- **Type:** `Inherited`

### `point`

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

