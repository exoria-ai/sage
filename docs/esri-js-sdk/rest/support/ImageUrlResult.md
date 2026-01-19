# ImageUrlResult

**Module:** `@arcgis/core/rest/support/ImageUrlResult`

## Import

```javascript
import ImageUrlResult from "@arcgis/core/rest/support/ImageUrlResult.js";
```

```javascript
// CDN
const ImageUrlResult = await $arcgis.import("@arcgis/core/rest/support/ImageUrlResult.js");
```

**Since:** 4.30

## See Also

- ImageryLayer.getImageUrl()
- imageService.getImageUrl()
- ImageUrlParameters

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `url`

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

