# ImageHistogramParameters

**Module:** `@arcgis/core/rest/support/ImageHistogramParameters`

## Import

```javascript
import ImageHistogramParameters from "@arcgis/core/rest/support/ImageHistogramParameters.js";
```

```javascript
// CDN
const ImageHistogramParameters = await $arcgis.import("@arcgis/core/rest/support/ImageHistogramParameters.js");
```

**Since:** 4.20

## See Also

- ImageryLayer.computeHistograms
- ImageryLayer.computeStatisticsHistograms
- ImageryTileLayer.computeStatisticsHistograms

## Property Details

### `ImageHistogramParameters`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `mosaicRule`

### `pixelSize`

### `rasterFunction`

### `timeExtent`

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
// set the pixel size parameter to match the current
// resolution of the view and spatial reference
let pixelSize = {
  x:view.resolution,
  y:view.resolution,
  spatialReference: view.spatialReference
}
// set the histogram parameters to request
// data for the current view extent and resolution
let params = new ImageHistogramParameters({
  geometry:  view.extent,
  pixelSize: pixelSize
});

// request for histograms for the specified parameters
layer.computeHistograms(params).then((results) =>{
  // results are returned and process it as needed.
  console.log("histograms", result);
})
.catch(function(err){
  console.log("err", err)
});
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

