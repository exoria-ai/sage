# VideoTimeExtent

**Module:** `@arcgis/core/layers/support/VideoTimeExtent`

## Import

```javascript
import VideoTimeExtent from "@arcgis/core/layers/support/VideoTimeExtent.js";
```

```javascript
// CDN
const VideoTimeExtent = await $arcgis.import("@arcgis/core/layers/support/VideoTimeExtent.js");
```

**Since:** 4.30

## See Also

- VideoLayer.videoTimeExtent

## Property Details

### `VideoTimeExtent`

### `declaredClass`
- **Type:** `Inherited`

### `duration`

### `end`

### `start`

### `timezone`

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

