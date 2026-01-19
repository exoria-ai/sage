# FeatureType

**Module:** `@arcgis/core/layers/support/FeatureType`

## Import

```javascript
import FeatureType from "@arcgis/core/layers/support/FeatureType.js";
```

```javascript
// CDN
const FeatureType = await $arcgis.import("@arcgis/core/layers/support/FeatureType.js");
```

**Since:** 4.4

## Property Details

### `FeatureType`

### `declaredClass`
- **Type:** `Inherited`

### `domains`

### `id`

### `name`

### `templates`

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

