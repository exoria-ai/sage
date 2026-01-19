# PointDrawAction

**Module:** `@arcgis/core/views/draw/PointDrawAction`

## Import

```javascript
import PointDrawAction from "@arcgis/core/views/draw/PointDrawAction.js";
```

```javascript
// CDN
const PointDrawAction = await $arcgis.import("@arcgis/core/views/draw/PointDrawAction.js");
```

**Since:** 4.5

## See Also

- Sample - Prevent drawing a self-intersecting line

## Property Details

### `PointDrawAction`

### `declaredClass`
- **Type:** `Inherited`

### `hasZ`
- **Type:** `Inherited`

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
function enableCreatePoint(draw, view) {
  let action = draw.create("point");

  // PointDrawAction.cursor-update
  // Give a visual feedback to users as they move the pointer over the view
  action.on("cursor-update", function (evt) {
    createPointGraphic(evt.coordinates);
  });

  // PointDrawAction.draw-complete
  // Create a point when user clicks on the view or presses the "Enter" key.
  action.on("draw-complete", function (evt) {
    createPointGraphic(evt.coordinates);
  });
}

function createPointGraphic(coordinates){
  view.graphics.removeAll();
  let point = {
    type: "point", // autocasts as /Point
    x: coordinates[0],
    y: coordinates[1],
    spatialReference: view.spatialReference
  };

  let graphic = new Graphic({
    geometry: point,
    symbol: {
      type: "simple-marker", // autocasts as SimpleMarkerSymbol
      style: "square",
      color: "red",
      size: "16px",
      outline: { // autocasts as SimpleLineSymbol
        color: [255, 255, 0],
        width: 3
      }
    }
  });
  view.graphics.add(graphic);
}
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

