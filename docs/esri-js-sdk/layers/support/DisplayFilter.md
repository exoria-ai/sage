# DisplayFilter

**Module:** `@arcgis/core/layers/support/DisplayFilter`

## Import

```javascript
import DisplayFilter from "@arcgis/core/layers/support/DisplayFilter.js";
```

```javascript
// CDN
const DisplayFilter = await $arcgis.import("@arcgis/core/layers/support/DisplayFilter.js");
```

**Since:** 4.32

## See Also

- DisplayFilterInfo
- View.displayFilterEnabled
- FeatureLayer.displayFilterInfo
- FeatureLayer.displayFilterEnabled
- Sample - Scale-dependent DisplayFilter

## Property Details

### `DisplayFilter`

### `declaredClass`
- **Type:** `Inherited`

### `id`

### `maxScale`

### `minScale`

### `title`

### `where`

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

