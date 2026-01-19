# MeasureAreaFromImageResult

**Module:** `@arcgis/core/rest/support/MeasureAreaFromImageResult`

## Import

```javascript
import MeasureAreaFromImageResult from "@arcgis/core/rest/support/MeasureAreaFromImageResult.js";
```

```javascript
// CDN
const MeasureAreaFromImageResult = await $arcgis.import("@arcgis/core/rest/support/MeasureAreaFromImageResult.js");
```

**Since:** 4.29

## See Also

- ImageryLayer.measureAreaFromImage()
- imageService.measureAreaFromImage()
- MeasureFromImageParameters

## Property Details

### `area`

### `center`

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

