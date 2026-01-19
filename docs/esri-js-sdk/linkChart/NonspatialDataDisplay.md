# NonspatialDataDisplay

**Module:** `@arcgis/core/linkChart/NonspatialDataDisplay`

## Import

```javascript
import NonspatialDataDisplay from "@arcgis/core/linkChart/NonspatialDataDisplay.js";
```

```javascript
// CDN
const NonspatialDataDisplay = await $arcgis.import("@arcgis/core/linkChart/NonspatialDataDisplay.js");
```

**Since:** 4.32

## See Also

- Web Map Specification | Link chart layout settings

## Property Details

### `NonspatialDataDisplay`

### `declaredClass`
- **Type:** `Inherited`

### `mode`

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

