# Presentation

**Module:** `@arcgis/core/webscene/Presentation`

## Import

```javascript
import Presentation from "@arcgis/core/webscene/Presentation.js";
```

```javascript
// CDN
const Presentation = await $arcgis.import("@arcgis/core/webscene/Presentation.js");
```

**Since:** 4.0

## See Also

- Slide
- Sample - WebScene slides
- Slide
- Sample - WebScene slides

## Property Details

### `Presentation`

### `declaredClass`
- **Type:** `Inherited`

### `slides`

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

