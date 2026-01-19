# Magnifier

**Module:** `@arcgis/core/views/Magnifier`

## Import

```javascript
import Magnifier from "@arcgis/core/views/Magnifier.js";
```

```javascript
// CDN
const Magnifier = await $arcgis.import("@arcgis/core/views/Magnifier.js");
```

**Since:** 4.19

## See Also

- MapView.magnifier
- SceneView.magnifier

## Property Details

### `Magnifier`

### `declaredClass`
- **Type:** `Inherited`

### `factor`

### `maskEnabled`

### `maskUrl`

### `offset`

### `overlayEnabled`

### `overlayUrl`

### `position`

### `size`

### `visible`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `ScreenPoint`


## Method Details

### `Method Details()`


## Examples

```javascript
view.when(() => {
  view.magnifier.visible = true;

  const offset = view.magnifier.size / 2;
  view.magnifier.offset = { x: offset, y: offset };

  //The magnifier will be displayed whenever the cursor hovers over the map.
  view.on("pointer-move", function (event) {
    view.magnifier.position = { x: event.x, y: event.y };
  });
});
```

```javascript
const offset = view.magnifier.size / 2;
view.magnifier.offset = { x: offset, y: offset };
```

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

