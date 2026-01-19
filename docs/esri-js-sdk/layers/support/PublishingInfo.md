# PublishingInfo

**Module:** `@arcgis/core/layers/support/PublishingInfo`

## Import

```javascript
import PublishingInfo from "@arcgis/core/layers/support/PublishingInfo.js";
```

```javascript
// CDN
const PublishingInfo = await $arcgis.import("@arcgis/core/layers/support/PublishingInfo.js");
```

**Since:** 4.25

## See Also

- FeatureLayer.publishingInfo

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `status`

### `updating`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
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

