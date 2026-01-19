# PolylineDrawAction

**Module:** `@arcgis/core/views/draw/PolylineDrawAction`

## Import

```javascript
import PolylineDrawAction from "@arcgis/core/views/draw/PolylineDrawAction.js";
```

```javascript
// CDN
const PolylineDrawAction = await $arcgis.import("@arcgis/core/views/draw/PolylineDrawAction.js");
```

**Since:** 4.5

## See Also

- Sample - Draw non-intersecting line

## Property Details

### `PolylineDrawAction`

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
function enableCreatePolyline(draw, view) {
  let action = draw.create("polyline");

  // listen to PolylineDrawAction.vertex-add
  // Fires when the user clicks, or presses the "F" key
  // Can also fire when the "R" key is pressed to redo.
  action.on("vertex-add", function (evt) {
    createPolylineGraphic(evt.vertices);
  });

  // listen to PolylineDrawAction.vertex-remove
  // Fires when the "Z" key is pressed to undo the
  // last added vertex
  action.on("vertex-remove", function (evt) {
    createPolylineGraphic(evt.vertices);
  });

  // listen to PolylineDrawAction.cursor-update
  // fires when the pointer moves over the view
  action.on("cursor-update", function (evt) {
    createPolylineGraphic(evt.vertices);
  });

  // listen to PolylineDrawAction.draw-complete
  // event to create a graphic when user double-clicks
  // on the view or presses the "Enter" key
  action.on("draw-complete", function (evt) {
    createPolylineGraphic(evt.vertices);
  });
}

function createPolylineGraphic(vertices){
  view.graphics.removeAll();
  let polyline = {
    type: "polyline", // autocasts as Polyline
    paths: vertices,
    spatialReference: view.spatialReference
  };

  let graphic = new Graphic({
    geometry: polyline,
    symbol: {
      type: "simple-line", // autocasts as SimpleLineSymbol
      color: [4, 90, 141],
      width: 3,
      cap: "round",
      join: "round"
    }
 });
 view.graphic.add(graphic);
}
```

```javascript
draw.create("polyline", {mode: "freehand"});
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

