# ImageSampleParameters

**Module:** `@arcgis/core/rest/support/ImageSampleParameters`

## Import

```javascript
import ImageSampleParameters from "@arcgis/core/rest/support/ImageSampleParameters.js";
```

```javascript
// CDN
const ImageSampleParameters = await $arcgis.import("@arcgis/core/rest/support/ImageSampleParameters.js");
```

**Since:** 4.20

## See Also

- ImageryLayer.getSamples()
- ImageSampleResult

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `geometry`

### `interpolation`

### `locations`

### `mosaicRule`

### `outFields`

### `pixelSize`

### `returnFirstValueOnly`

### `sampleCount`

### `sampleDistance`

### `sliceId`

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

