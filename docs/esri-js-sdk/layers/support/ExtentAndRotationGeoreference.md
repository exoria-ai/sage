# ExtentAndRotationGeoreference

**Module:** `@arcgis/core/layers/support/ExtentAndRotationGeoreference`

## Import

```javascript
import ExtentAndRotationGeoreference from "@arcgis/core/layers/support/ExtentAndRotationGeoreference.js";
```

```javascript
// CDN
const ExtentAndRotationGeoreference = await $arcgis.import("@arcgis/core/layers/support/ExtentAndRotationGeoreference.js");
```

**Since:** 4.24

## See Also

- ImageElement.georeference
- VideoElement.georeference
- Sample - MediaLayer with images
- ImageElement.georeference
- VideoElement.georeference
- ImageElement.georeference
- VideoElement.georeference

## Property Details

### `ExtentAndRotationGeoreference`

### `declaredClass`
- **Type:** `Inherited`

### `extent`

### `rotation`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// create a new ExtentAndRotationGeoreference
const geoReference = new ExtentAndRotationGeoreference({
  extent: new Extent({
    spatialReference: {
      wkid: 102100
    },
    xmin: -10047456.27662979,
    ymin: 3486722.2723874687,
    xmax: -10006982.870152846,
    ymax: 3514468.91365495
  })
});
const imageElement = new ImageElement({
  type: "image",
  image: "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/neworleans1891.png",
  georeference: geoReference
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

