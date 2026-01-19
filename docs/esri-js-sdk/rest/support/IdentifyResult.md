# IdentifyResult

**Module:** `@arcgis/core/rest/support/IdentifyResult`

## Import

```javascript
import IdentifyResult from "@arcgis/core/rest/support/IdentifyResult.js";
```

```javascript
// CDN
const IdentifyResult = await $arcgis.import("@arcgis/core/rest/support/IdentifyResult.js");
```

**Since:** 4.20

## See Also

- identify
- IdentifyParameters
- Identify - ArcGIS Server REST API

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `displayFieldName`

### `feature`

### `layerId`

### `layerName`

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

