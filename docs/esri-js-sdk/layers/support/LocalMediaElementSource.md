# LocalMediaElementSource

**Module:** `@arcgis/core/layers/support/LocalMediaElementSource`

## Import

```javascript
import LocalMediaElementSource from "@arcgis/core/layers/support/LocalMediaElementSource.js";
```

```javascript
// CDN
const LocalMediaElementSource = await $arcgis.import("@arcgis/core/layers/support/LocalMediaElementSource.js");
```

**Since:** 4.24

## See Also

- MediaLayer
- Sample - MediaLayer with images
- Sample - MediaLayer with video
- elements

## Property Details

### `LocalMediaElementSource`

### `declaredClass`
- **Type:** `Inherited`

### `elements`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `MediaElement`


## Method Details

### `Method Details()`


## Examples

```javascript
// add a new imageElement to the media layer at runtime
const imageElement = new ImageElement({
  image: "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/neworleans1891.png",
  georeference: new ExtentAndRotationGeoreference({
    extent: new Extent({
      spatialReference: {
         wkid: 102100
      },
      xmin: -10047456.27662979,
      ymin: 3486722.2723874687,
      xmax: -10006982.870152846,
      ymax: 3514468.91365495
    })
  })
});
layer.source.elements.add(imageElement);
```

```javascript
// remove image element from the media layer at runtime
layer.source.elements.remove(selectedImageElement);
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

