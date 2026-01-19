# GeometryFieldsInfo

**Module:** `@arcgis/core/layers/support/GeometryFieldsInfo`

## Import

```javascript
import GeometryFieldsInfo from "@arcgis/core/layers/support/GeometryFieldsInfo.js";
```

```javascript
// CDN
const GeometryFieldsInfo = await $arcgis.import("@arcgis/core/layers/support/GeometryFieldsInfo.js");
```

**Since:** 4.19

## Overview

The GeometryFieldsInfo class returns information about the system maintained geometry information associated with a specific feature in a FeatureLayer. In addition, it also provides the unit of measurement used for these field values.

## See Also

- FeatureLayer
- ArcGIS REST API documentation

## Property Details

### `GeometryFieldsInfo`

### `declaredClass`
- **Type:** `Inherited`

### `shapeAreaField`

### `shapeLengthField`

### `units`

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

