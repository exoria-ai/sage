# FeatureFenceParameters

**Module:** `@arcgis/core/webdoc/geotriggersInfo/FeatureFenceParameters`

## Import

```javascript
import FeatureFenceParameters from "@arcgis/core/webdoc/geotriggersInfo/FeatureFenceParameters.js";
```

```javascript
// CDN
const FeatureFenceParameters = await $arcgis.import("@arcgis/core/webdoc/geotriggersInfo/FeatureFenceParameters.js");
```

**Since:** 4.24

## Property Details

### `FeatureFenceParameters`

### `bufferDistance`

### `declaredClass`
- **Type:** `Inherited`

### `fenceSource`

### `filter`

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
let fenceParameters = new FeatureFenceParameters({
  fenceSource: { // autocasts as new FeatureLayerSource()
    layerUrl: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Recreation/MapServer/0"
  },
  filter: { // autocasts as new FeatureFilter()
    where: "facility = 6",
    geometry: {
      x: 13871520.850500003,
      y: 3910293.086000003,
      spatialReference: {
        wkid: 102100,
        latestWkid: 3857
      }
    }
  },
  bufferDistance: 50 // meters
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

