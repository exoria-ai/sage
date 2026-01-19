# ImageAreaParameters

**Module:** `@arcgis/core/rest/support/ImageAreaParameters`

## Import

```javascript
import ImageAreaParameters from "@arcgis/core/rest/support/ImageAreaParameters.js";
```

```javascript
// CDN
const ImageAreaParameters = await $arcgis.import("@arcgis/core/rest/support/ImageAreaParameters.js");
```

**Since:** 4.26

## See Also

- ImageryLayer.measureAreaAndPerimeter()
- imageService.measureAreaAndPerimeter()
- ImageAreaResult

## Property Details

### `ImageAreaParameters`

### `areaUnit`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `is3D`

### `linearUnit`

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

