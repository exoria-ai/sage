# NavigationActionMap

**Module:** `@arcgis/core/views/navigation/NavigationActionMap`

## Import

```javascript
import NavigationActionMap from "@arcgis/core/views/navigation/NavigationActionMap.js";
```

```javascript
// CDN
const NavigationActionMap = await $arcgis.import("@arcgis/core/views/navigation/NavigationActionMap.js");
```

**Since:** 4.32

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `dragPrimary`

### `dragSecondary`

### `dragTertiary`

### `mouseWheel`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `DragAction`


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

