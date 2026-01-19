# RasterInfo

**Module:** `@arcgis/core/layers/support/RasterInfo`

## Import

```javascript
import RasterInfo from "@arcgis/core/layers/support/RasterInfo.js";
```

```javascript
// CDN
const RasterInfo = await $arcgis.import("@arcgis/core/layers/support/RasterInfo.js");
```

**Since:** 4.12

## See Also

- ImageryLayer
- ImageryTileLayer
- WCSLayer
- Raster info
- Sample - Raster attribute table
- Raster Attribute Table
- Raster colormap
- Raster histograms
- Raster key properties
- ImageryLayer - working with multidimensional raster data
- ImageryTileLayer - working with multidimensional raster data
- Sample - Transposed multidimensional ImageryTileLayer

## Property Details

### `attributeTable`

### `bandCount`

### `bandInfos`

### `colormap`

### `dataType`

### `declaredClass`
- **Type:** `Inherited`

### `extent`

### `hasMultidimensionalTranspose`

### `height`

### `histograms`

### `keyProperties`

### `multidimensionalInfo`

### `noDataValue`

### `pixelSize`

### `pixelType`

### `sensorInfo`

### `spatialReference`

### `statistics`

### `width`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `RasterMultidimensionalInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
layer.when(function() {
  // accesses the raster attribute table of the layer
  let rasterAttributes = layer.serviceRasterInfo.attributeTable.features;
});
```

```javascript
// update the statistics of the layer's stretch renderer.
const renderer = layer.renderer.clone();
 const dimensions = layer.rasterInfo.multidimensionalInfo;
// get the salinity variable's statistics
const salinity = dimensions.variables.find((variable) => variable.name === variableName);
renderer.customStatistics = salinity.statistics;
layer.renderer = renderer;
```

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

```javascript
// update the statistics of the layer's stretch renderer.
const renderer = layer.renderer.clone();
 const dimensions = layer.rasterInfo.multidimensionalInfo;
// get the salinity variable's statistics
const salinity = dimensions.variables.find((variable) => variable.name === variableName);
renderer.customStatistics = salinity.statistics;
layer.renderer = renderer;
```

