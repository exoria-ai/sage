# ImageVolume

**Module:** `@arcgis/core/rest/support/ImageVolume`

## Import

```javascript
import ImageVolume from "@arcgis/core/rest/support/ImageVolume.js";
```

```javascript
// CDN
const ImageVolume = await $arcgis.import("@arcgis/core/rest/support/ImageVolume.js");
```

**Since:** 4.32

## See Also

- ImageVolumeResult
- ImageVolumeParameters
- ImageryLayer.calculateVolume()

## Property Details

### `area`

### `cut`

### `cutCellCount`

### `declaredClass`
- **Type:** `Inherited`

### `fill`

### `fillCellCount`

### `maxZ`

### `meanZ`

### `minZ`

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

