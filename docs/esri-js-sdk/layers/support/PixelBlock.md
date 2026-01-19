# PixelBlock

**Module:** `@arcgis/core/layers/support/PixelBlock`

## Import

```javascript
import PixelBlock from "@arcgis/core/layers/support/PixelBlock.js";
```

```javascript
// CDN
const PixelBlock = await $arcgis.import("@arcgis/core/layers/support/PixelBlock.js");
```

**Since:** 4.0

## See Also

- ImageryLayer
- Sample - Access pixel values in an ImageryLayer

## Property Details

### `PixelBlock`

### `declaredClass`
- **Type:** `Inherited`

### `height`

### `mask`

### `maskIsAlpha`

### `pixelType`

### `pixels`

### `statistics`

### `validPixelCount`

### `width`

### `addData`

### `addHandles`
- **Type:** `Inherited`

### `getAsRGBA`

### `getAsRGBAFloat`

### `getPlaneCount`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let pixels = imgLyr.pixelData.pixelBlock.pixels;
// Prints the number of bands in the layer
console.log(pixels.length);
// An array containing all the pixels in the first band
let band1 = pixels[0];
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

