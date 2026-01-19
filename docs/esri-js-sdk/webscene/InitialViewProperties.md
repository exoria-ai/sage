# InitialViewProperties

**Module:** `@arcgis/core/webscene/InitialViewProperties`

## Import

```javascript
import InitialViewProperties from "@arcgis/core/webscene/InitialViewProperties.js";
```

```javascript
// CDN
const InitialViewProperties = await $arcgis.import("@arcgis/core/webscene/InitialViewProperties.js");
```

**Since:** 4.0

## See Also

- clippingArea
- Sample - Create a local scene

## Property Details

### `InitialViewProperties`

### `analyses`

### `declaredClass`
- **Type:** `Inherited`

### `environment`

### `spatialReference`

### `timeExtent`

### `viewingMode`

### `viewpoint`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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

