# MapImage

**Module:** `@arcgis/core/layers/support/MapImage`

## Import

```javascript
import MapImage from "@arcgis/core/layers/support/MapImage.js";
```

```javascript
// CDN
const MapImage = await $arcgis.import("@arcgis/core/layers/support/MapImage.js");
```

**Since:** 4.0

## See Also

- JobInfo

## Property Details

### `MapImage`

### `declaredClass`
- **Type:** `Inherited`

### `extent`

### `height`

### `href`

### `opacity`

### `scale`

### `visible`

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

