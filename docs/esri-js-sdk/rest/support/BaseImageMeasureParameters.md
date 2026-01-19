# BaseImageMeasureParameters

**Module:** `@arcgis/core/rest/support/BaseImageMeasureParameters`

## Import

```javascript
import BaseImageMeasureParameters from "@arcgis/core/rest/support/BaseImageMeasureParameters.js";
```

```javascript
// CDN
const BaseImageMeasureParameters = await $arcgis.import("@arcgis/core/rest/support/BaseImageMeasureParameters.js");
```

**Since:** 4.27

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `mosaicRule`

### `pixelSize`

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

