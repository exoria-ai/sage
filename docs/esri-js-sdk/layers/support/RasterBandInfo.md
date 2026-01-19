# RasterBandInfo

**Module:** `@arcgis/core/layers/support/RasterBandInfo`

## Import

```javascript
import RasterBandInfo from "@arcgis/core/layers/support/RasterBandInfo.js";
```

```javascript
// CDN
const RasterBandInfo = await $arcgis.import("@arcgis/core/layers/support/RasterBandInfo.js");
```

**Since:** 4.27

## See Also

- RasterInfo
- ImageryLayer
- ImageryTileLayer
- Raster info

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `maxWavelength`

### `minWavelength`

### `name`

### `radianceBias`

### `radianceGain`

### `reflectanceBias`

### `reflectanceGain`

### `solarIrradiance`

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

