# CornersGeoreference

**Module:** `@arcgis/core/layers/support/CornersGeoreference`

## Import

```javascript
import CornersGeoreference from "@arcgis/core/layers/support/CornersGeoreference.js";
```

```javascript
// CDN
const CornersGeoreference = await $arcgis.import("@arcgis/core/layers/support/CornersGeoreference.js");
```

**Since:** 4.24

## See Also

- ImageElement.georeference
- VideoElement.georeference
- Sample - MediaLayer with video
- ImageElement.georeference
- VideoElement.georeference
- ImageElement.georeference
- VideoElement.georeference
- ImageElement.georeference
- VideoElement.georeference
- ImageElement.georeference
- VideoElement.georeference

## Property Details

### `CornersGeoreference`

### `bottomLeft`

### `bottomRight`

### `declaredClass`
- **Type:** `Inherited`

### `topLeft`

### `topRight`

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
// create a canvas image element by setting its corner points of the bounding box
const canvasElement = new ImageElement({
  image: canvas,
  georeference: new CornersGeoreference({
    bottomRight: new Point({
      x: -121.369,
      y: 45.061,
      spatialReference: {
        wkid: 4326
      }
    }),
    bottomLeft: new Point({
      x: -122.363,
      y: 45.061,
      spatialReference: {
        wkid: 4326
      }
    }),
    topRight: new Point({
      x: -121.369,
      y: 45.678,
      spatialReference: {
        wkid: 4326
      }
    }),
    topLeft: new Point({
      x: -122.363,
      y: 45.678,
      spatialReference: {
        wkid: 4326
      }
    })
  })
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

