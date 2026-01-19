# FeatureReferenceId

**Module:** `@arcgis/core/webscene/support/FeatureReferenceId`

## Import

```javascript
import FeatureReferenceId from "@arcgis/core/webscene/support/FeatureReferenceId.js";
```

```javascript
// CDN
const FeatureReferenceId = await $arcgis.import("@arcgis/core/webscene/support/FeatureReferenceId.js");
```

**Since:** 4.33

## Property Details

### `declaredClass`
- **Type:** `Inherited`

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

