# AttributeBinsFeatureSet

**Module:** `@arcgis/core/rest/support/AttributeBinsFeatureSet`

## Import

```javascript
import AttributeBinsFeatureSet from "@arcgis/core/rest/support/AttributeBinsFeatureSet.js";
```

```javascript
// CDN
const AttributeBinsFeatureSet = await $arcgis.import("@arcgis/core/rest/support/AttributeBinsFeatureSet.js");
```

**Since:** 4.32

## See Also

- AttributeBinsQuery
- AttributeBinsGraphic
- Sample - Attribute Bins Query
- Query.returnQueryGeometry

## Property Details

### `AttributeBinsFeatureSet`

### `declaredClass`
- **Type:** `Inherited`

### `displayFieldName`
- **Type:** `Inherited`

### `exceededTransferLimit`
- **Type:** `Inherited`

### `features`

### `fields`
- **Type:** `Inherited`

### `geometryType`
- **Type:** `Inherited`

### `queryGeometry`
- **Type:** `Inherited`

### `spatialReference`
- **Type:** `Inherited`

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

