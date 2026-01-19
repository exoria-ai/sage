# MultipartColorRamp

**Module:** `@arcgis/core/rest/support/MultipartColorRamp`

## Import

```javascript
import MultipartColorRamp from "@arcgis/core/rest/support/MultipartColorRamp.js";
```

```javascript
// CDN
const MultipartColorRamp = await $arcgis.import("@arcgis/core/rest/support/MultipartColorRamp.js");
```

**Since:** 4.0

## See Also

- Sample - ImageryTileLayer - shaded relief renderer

## Property Details

### `MultipartColorRamp`

### `colorRamps`

### `declaredClass`
- **Type:** `Inherited`

### `type`

### `weights`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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

