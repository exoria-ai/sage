# FeatureSet

**Module:** `@arcgis/core/rest/support/FeatureSet`

## Import

```javascript
import FeatureSet from "@arcgis/core/rest/support/FeatureSet.js";
```

```javascript
// CDN
const FeatureSet = await $arcgis.import("@arcgis/core/rest/support/FeatureSet.js");
```

**Since:** 4.20

## See Also

- query
- Query.returnQueryGeometry

## Property Details

### `FeatureSet`

### `declaredClass`
- **Type:** `Inherited`

### `displayFieldName`

### `exceededTransferLimit`

### `features`

### `fields`

### `geometryType`

### `queryGeometry`

### `spatialReference`

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

