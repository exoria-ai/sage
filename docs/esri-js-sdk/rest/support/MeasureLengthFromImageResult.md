# MeasureLengthFromImageResult

**Module:** `@arcgis/core/rest/support/MeasureLengthFromImageResult`

## Import

```javascript
import MeasureLengthFromImageResult from "@arcgis/core/rest/support/MeasureLengthFromImageResult.js";
```

```javascript
// CDN
const MeasureLengthFromImageResult = await $arcgis.import("@arcgis/core/rest/support/MeasureLengthFromImageResult.js");
```

**Since:** 4.29

## See Also

- ImageryLayer.measureLengthFromImage()
- imageService.measureLengthFromImage()
- MeasureFromImageParameters

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `length`

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

