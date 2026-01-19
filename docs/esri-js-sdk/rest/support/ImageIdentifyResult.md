# ImageIdentifyResult

**Module:** `@arcgis/core/rest/support/ImageIdentifyResult`

## Import

```javascript
import ImageIdentifyResult from "@arcgis/core/rest/support/ImageIdentifyResult.js";
```

```javascript
// CDN
const ImageIdentifyResult = await $arcgis.import("@arcgis/core/rest/support/ImageIdentifyResult.js");
```

**Since:** 4.20

## See Also

- imageService
- ImageIdentifyParameters

## Property Details

### `catalogItemVisibilities`

### `catalogItems`

### `declaredClass`
- **Type:** `Inherited`

### `location`

### `name`

### `objectId`

### `properties`

### `value`

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

