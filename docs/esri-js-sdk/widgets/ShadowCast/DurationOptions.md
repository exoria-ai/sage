# DurationOptions

**Module:** `@arcgis/core/widgets/ShadowCast/DurationOptions`

## Import

```javascript
import DurationOptions from "@arcgis/core/widgets/ShadowCast/DurationOptions.js";
```

```javascript
// CDN
const DurationOptions = await $arcgis.import("@arcgis/core/widgets/ShadowCast/DurationOptions.js");
```

**Since:** 4.33

## See Also

- ShadowCast
- ShadowCastViewModel

## Property Details

### `DurationOptions`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `mode`

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

