# ImageIdentifyParameters

**Module:** `@arcgis/core/rest/support/ImageIdentifyParameters`

## Import

```javascript
import ImageIdentifyParameters from "@arcgis/core/rest/support/ImageIdentifyParameters.js";
```

```javascript
// CDN
const ImageIdentifyParameters = await $arcgis.import("@arcgis/core/rest/support/ImageIdentifyParameters.js");
```

**Since:** 4.20

## See Also

- imageService
- ImageIdentifyResult

## Property Details

### `ImageIdentifyParameters`

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `maxItemCount`

### `mosaicRule`

### `pixelSize`

### `processAsMultidimensional`

### `rasterFunction`

### `rasterFunctions`

### `returnCatalogItems`

### `returnGeometry`

### `returnPixelValues`

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
// set the identify parameters
// data for the current view extent and resolution
let params = new ImageIdentifyParameters({
  geometry:  view.extent,
  pixelSize: pixelSize
});

// request info for a given location for the specified parameters
layer.identify(params).then((result) => {
  // results are returned and process it as needed.
  console.log("identify result", result);
})
.catch(function(error){
  console.log("error", error)
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

