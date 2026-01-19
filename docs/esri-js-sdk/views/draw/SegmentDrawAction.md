# SegmentDrawAction

**Module:** `@arcgis/core/views/draw/SegmentDrawAction`

## Import

```javascript
import SegmentDrawAction from "@arcgis/core/views/draw/SegmentDrawAction.js";
```

```javascript
// CDN
const SegmentDrawAction = await $arcgis.import("@arcgis/core/views/draw/SegmentDrawAction.js");
```

**Since:** 4.7

## See Also

- Sample - Prevent drawing a self-intersecting line

## Property Details

### `SegmentDrawAction`

### `declaredClass`
- **Type:** `Inherited`

### `hasZ`
- **Type:** `Inherited`

### `mode`

### `vertices`
- **Type:** `Inherited`

### `view`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `canRedo`
- **Type:** `Inherited`

### `canUndo`
- **Type:** `Inherited`

### `complete`

### `emit`
- **Type:** `Inherited`

### `getCoordsAndPointFromScreenPoint`
- **Type:** `Inherited`

### `getCoordsFromScreenPoint`
- **Type:** `Inherited`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `redo`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `screenToMap`
- **Type:** `Inherited`

### `undo`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
draw.create("rectangle", {mode: "click"});
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

