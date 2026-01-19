# FeatureLayerSource

**Module:** `@arcgis/core/webdoc/geotriggersInfo/FeatureLayerSource`

## Import

```javascript
import FeatureLayerSource from "@arcgis/core/webdoc/geotriggersInfo/FeatureLayerSource.js";
```

```javascript
// CDN
const FeatureLayerSource = await $arcgis.import("@arcgis/core/webdoc/geotriggersInfo/FeatureLayerSource.js");
```

**Since:** 4.24

## Property Details

### `FeatureLayerSource`

### `declaredClass`
- **Type:** `Inherited`

### `layerId`

### `layerUrl`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
let source = new FeatureLayerSource({
  // If layerUrl is present, layerId is unnecessary (and vice-versa)
  layerUrl: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Recreation/MapServer/0"
})
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

