# ImageVolumeParameters

**Module:** `@arcgis/core/rest/support/ImageVolumeParameters`

## Import

```javascript
import ImageVolumeParameters from "@arcgis/core/rest/support/ImageVolumeParameters.js";
```

```javascript
// CDN
const ImageVolumeParameters = await $arcgis.import("@arcgis/core/rest/support/ImageVolumeParameters.js");
```

**Since:** 4.32

## See Also

- ArcGIS REST API - Compute Pixel Location
- ImageryLayer.calculateVolume()
- ImageVolumeResult

## Property Details

### `baseType`

### `constantZ`

### `declaredClass`
- **Type:** `Inherited`

### `geometries`

### `mosaicRule`

### `pixelSize`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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

