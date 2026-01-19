# BaseImageMeasureResult

**Module:** `@arcgis/core/rest/support/BaseImageMeasureResult`

## Import

```javascript
import BaseImageMeasureResult from "@arcgis/core/rest/support/BaseImageMeasureResult.js";
```

```javascript
// CDN
const BaseImageMeasureResult = await $arcgis.import("@arcgis/core/rest/support/BaseImageMeasureResult.js");
```

**Since:** 4.26

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `name`

### `sensorName`

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

