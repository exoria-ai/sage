# ImageParameters

**Module:** `@arcgis/core/rest/support/ImageParameters`

## Import

```javascript
import ImageParameters from "@arcgis/core/rest/support/ImageParameters.js";
```

```javascript
// CDN
const ImageParameters = await $arcgis.import("@arcgis/core/rest/support/ImageParameters.js");
```

**Since:** 4.24

## See Also

- JobInfo.fetchResultImage()
- JobInfo.fetchResultMapImageLayer()

## Property Details

### `ImageParameters`

### `declaredClass`
- **Type:** `Inherited`

### `dpi`

### `extent`

### `format`

### `height`

### `imageSpatialReference`

### `layerDefinitions`

### `layerIds`

### `layerOption`

### `transparent`

### `width`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
let imageParams = new ImageParameters();
imageParams.format = "jpg";
```

```javascript
let layerDefs = [];
layerDefs[5] = "STATE_NAME='Kansas'";
layerDefs[4] = "STATE_NAME='Kansas' and POP2007>25000";
layerDefs[3] = "STATE_NAME='Kansas' and POP2007>25000";

let imageParams = new ImageParameters({
  layerDefinitions: layerDefs
});
```

```javascript
let imageParams = new ImageParameters();
imageParams.layerIds = [3,4,5];
imageParams.layerOption = "show";
```

```javascript
let imageParams = new ImageParameters();
imageParams.layerOption = "show";
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

