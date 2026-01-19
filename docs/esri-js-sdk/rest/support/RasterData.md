# RasterData

**Module:** `@arcgis/core/rest/support/RasterData`

## Import

```javascript
import RasterData from "@arcgis/core/rest/support/RasterData.js";
```

```javascript
// CDN
const RasterData = await $arcgis.import("@arcgis/core/rest/support/RasterData.js");
```

**Since:** 4.20

## See Also

- Geoprocessing Data Types | GPRasterDataLayer

## Property Details

### `RasterData`

### `declaredClass`
- **Type:** `Inherited`

### `format`

### `itemId`

### `type`

### `url`

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
// Create a new RasterData object representing a tif image.
const rasterData = new RasterData({
  url: "https://myserver/lake.tif"
});
```

```javascript
const parameterValue = await jobInfo.fetchResultData("Output_TIF_GDB");
console.log(parameterValue.dataType); // "raster-data-layer"

const rasterData = parameterValue.value;
console.log(rasterData.url);    // "https://machine.domain.com/webadaptor/rest/directories/arcgisoutput/GPServer/_ags_africa_150m.tif"
console.log(rasterData.format); // "tif"
```

```javascript
const rasterData = new RasterData({
  itemId: "my-portal-item-id"
});
```

```javascript
const rasterData = parameterValue.value;
const { url, format, type } = rasterData;
if (url) {
  if (type === "image-service") {
    console.log(`The url to the image service is: ${url}`);
  else {
    console.log(`The url to the raster data file is: ${url}`);
    console.log(`The raster data file is a ${format} image`);
  }
}
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

