# MeasureFromImageParameters

**Module:** `@arcgis/core/rest/support/MeasureFromImageParameters`

## Import

```javascript
import MeasureFromImageParameters from "@arcgis/core/rest/support/MeasureFromImageParameters.js";
```

```javascript
// CDN
const MeasureFromImageParameters = await $arcgis.import("@arcgis/core/rest/support/MeasureFromImageParameters.js");
```

**Since:** 4.29

## See Also

- ImageryLayer.measureLengthFromImage()
- ImageryLayer.measureAreaFromImage()
- imageService.measureLengthFromImage()
- imageService.measureAreaFromImage()

## Property Details

### `MeasureFromImageParameters`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `rasterId`

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

