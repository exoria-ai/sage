# IdentifyParameters

**Module:** `@arcgis/core/rest/support/IdentifyParameters`

## Import

```javascript
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters.js";
```

```javascript
// CDN
const IdentifyParameters = await $arcgis.import("@arcgis/core/rest/support/IdentifyParameters.js");
```

**Since:** 4.20

## See Also

- identify
- IdentifyResult
- Identify - ArcGIS Server REST API
- Identify - ArcGIS Server REST API

## Property Details

### `IdentifyParameters`

### `declaredClass`
- **Type:** `Inherited`

### `dpi`

### `gdbVersion`

### `geometry`

### `geometryPrecision`

### `height`

### `historicMoment`

### `layerIds`

### `layerOption`

### `mapExtent`

### `maxAllowableOffset`

### `returnFieldName`

### `returnGeometry`

### `returnM`

### `returnUnformattedValues`

### `returnZ`

### `spatialReference`

### `sublayers`

### `timeExtent`

### `tolerance`

### `width`

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
const {
  extent: maxExtent,
  spatialReference,
  width,
  height,
  timeExtent,
} = view;

const parameters = new IdentifyParameters({
  sublayers: layer.sublayers,
  layerOption: "popup",
  returnGeometry: true,
  geometry: maxExtent.center,
  tolerance: 5,
  height,
  mapExtent,
  spatialReference,
  timeExtent,
  width,
});

identify(layer.url, parameters).then((response) => {
  // process the response
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

