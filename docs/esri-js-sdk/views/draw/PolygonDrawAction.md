# PolygonDrawAction

**Module:** `@arcgis/core/views/draw/PolygonDrawAction`

## Import

```javascript
import PolygonDrawAction from "@arcgis/core/views/draw/PolygonDrawAction.js";
```

```javascript
// CDN
const PolygonDrawAction = await $arcgis.import("@arcgis/core/views/draw/PolygonDrawAction.js");
```

**Since:** 4.5

## See Also

- Sample - Prevent drawing a self-intersecting line

## Property Details

### `PolygonDrawAction`

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
function enableCreatePolygon(draw, view) {
  let action = draw.create("polygon");

  // PolygonDrawAction.vertex-add
  // Fires when user clicks, or presses the "F" key.
  // Can also be triggered when the "R" key is pressed to redo.
  action.on("vertex-add", function (evt) {
    createPolygonGraphic(evt.vertices);
  });

  // PolygonDrawAction.vertex-remove
  // Fires when the "Z" key is pressed to undo the last added vertex
  action.on("vertex-remove", function (evt) {
    createPolygonGraphic(evt.vertices);
  });

  // Fires when the pointer moves over the view
  action.on("cursor-update", function (evt) {
    createPolygonGraphic(evt.vertices);
  });

  // Add a graphic representing the completed polygon
  // when user double-clicks on the view or presses the "Enter" key
  action.on("draw-complete", function (evt) {
    createPolygonGraphic(evt.vertices);
  });
}

function createPolygonGraphic(vertices){
  view.graphics.removeAll();
  let polygon = {
    type: "polygon", // autocasts as Polygon
    rings: vertices,
    spatialReference: view.spatialReference
  };

  let graphic = new Graphic({
    geometry: polygon,
    symbol: {
      type: "simple-fill", // autocasts as SimpleFillSymbol
      color: "purple",
      style: "solid",
      outline: {  // autocasts as SimpleLineSymbol
        color: "white",
        width: 1
      }
    }
  });
  view.graphics.add(graphic);
}
```

```javascript
draw.create("polygon", {mode: "freehand"});
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

