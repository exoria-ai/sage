# Renderer

**Module:** `@arcgis/core/renderers/Renderer`

## Import

```javascript
import Renderer from "@arcgis/core/renderers/Renderer.js";
```

```javascript
// CDN
const Renderer = await $arcgis.import("@arcgis/core/renderers/Renderer.js");
```

**Since:** 4.0

## See Also

- Styles and data visualization

## Property Details

### `authoringInfo`

### `declaredClass`
- **Type:** `Inherited`

### `type`

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

