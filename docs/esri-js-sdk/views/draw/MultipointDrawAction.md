# MultipointDrawAction

**Module:** `@arcgis/core/views/draw/MultipointDrawAction`

## Import

```javascript
import MultipointDrawAction from "@arcgis/core/views/draw/MultipointDrawAction.js";
```

```javascript
// CDN
const MultipointDrawAction = await $arcgis.import("@arcgis/core/views/draw/MultipointDrawAction.js");
```

**Since:** 4.6

## See Also

- Sample - Prevent drawing a self-intersecting line

## Property Details

### `MultipointDrawAction`

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
function enableCreateMultipoint(draw, view) {
  let action = draw.create("multipoint");

  // Give a visual feedback to users as they move the pointer over the view
  action.on("cursor-update", function (evt) {
    createMultipointGraphic(evt.vertices);
  });

  // Fires when the user clicks, or presses the "F" key on the view
  // Can also fire when the "R" key is pressed to redo.
  action.on("vertex-add", function (evt) {
    createMultipointGraphic(evt.vertices);
  });

  // Fires when the "Z" key is pressed to undo the last added point
  action.on("vertex-remove", function (evt) {
    createMultipointGraphic(evt.vertices);
  });

  // Create a point when user clicks on the view or presses the "Enter" key.
  action.on("draw-complete", function (evt) {
    createMultipointGraphic(evt.vertices);
  });
}

function createMultipointGraphic(vertices) {
  view.graphics.removeAll();

  let multipoint = new Multipoint({
    points: vertices,
    spatialReference: view.spatialReference
  });

  graphic = new Graphic({
    geometry: multipoint,
    symbol: {
      type: "simple-marker",
      style: "square",
      color: "red",
      size: "16px",
      outline: {
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

