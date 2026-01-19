# DrawAction

**Module:** `@arcgis/core/views/draw/DrawAction`

## Import

```javascript
import DrawAction from "@arcgis/core/views/draw/DrawAction.js";
```

```javascript
// CDN
const DrawAction = await $arcgis.import("@arcgis/core/views/draw/DrawAction.js");
```

**Since:** 4.7

## See Also

- Sample - Prevent drawing a self-intersecting line

## Property Details

### `DrawAction`

### `declaredClass`
- **Type:** `Inherited`

### `hasZ`

### `vertices`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `canRedo`

### `canUndo`

### `emit`

### `getCoordsAndPointFromScreenPoint`

### `getCoordsFromScreenPoint`

### `hasEventListener`

### `hasHandles`
- **Type:** `Inherited`

### `on`

### `redo`

### `removeHandles`
- **Type:** `Inherited`

### `screenToMap`

### `undo`

### `FromScreenPointResult`

### `ScreenPoint`


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
view.on("click", function(event){
  // event is the event handle returned after the event fires.
  console.log(event.mapPoint);
});
```

```javascript
if (action.canRedo()) {
  action.redo();
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

```javascript
if (action.canUndo()) {
  action.undo();
}
```

