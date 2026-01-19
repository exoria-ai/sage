# NetworkFeatureSet

**Module:** `@arcgis/core/rest/support/NetworkFeatureSet`

## Import

```javascript
import NetworkFeatureSet from "@arcgis/core/rest/support/NetworkFeatureSet.js";
```

```javascript
// CDN
const NetworkFeatureSet = await $arcgis.import("@arcgis/core/rest/support/NetworkFeatureSet.js");
```

**Since:** 4.21

## See Also

- closestFacility
- route
- serviceArea
- Query.returnQueryGeometry

## Property Details

### `NetworkFeatureSet`

### `declaredClass`
- **Type:** `Inherited`

### `displayFieldName`
- **Type:** `Inherited`

### `doNotLocateOnRestrictedElements`

### `exceededTransferLimit`
- **Type:** `Inherited`

### `features`
- **Type:** `Inherited`

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
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


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

