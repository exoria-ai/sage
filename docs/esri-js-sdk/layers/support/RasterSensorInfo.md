# RasterSensorInfo

**Module:** `@arcgis/core/layers/support/RasterSensorInfo`

## Import

```javascript
import RasterSensorInfo from "@arcgis/core/layers/support/RasterSensorInfo.js";
```

```javascript
// CDN
const RasterSensorInfo = await $arcgis.import("@arcgis/core/layers/support/RasterSensorInfo.js");
```

**Since:** 4.27

## See Also

- RasterInfo
- ImageryLayer
- ImageryTileLayer
- Raster info

## Property Details

### `acquisitionDate`

### `cloudCover`

### `declaredClass`
- **Type:** `Inherited`

### `productName`

### `sensorAzimuth`

### `sensorElevation`

### `sensorName`

### `sunAzimuth`

### `sunElevation`

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

