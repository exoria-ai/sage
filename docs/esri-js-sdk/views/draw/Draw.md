# Draw

**Module:** `@arcgis/core/views/draw/Draw`

## Import

```javascript
import Draw from "@arcgis/core/views/draw/Draw.js";
```

```javascript
// CDN
const Draw = await $arcgis.import("@arcgis/core/views/draw/Draw.js");
```

**Since:** 4.5

## See Also

- SketchViewModel
- Prevent drawing a self-intersecting line
- Sketch widget

## Property Details

### `Draw`

### `activeAction`

### `declaredClass`
- **Type:** `Inherited`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `complete`

### `create`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `reset`


## Method Details

### `Method Details()`


## Examples

```javascript
// create a new instance of draw
let draw = new Draw({
  view: view
});

// create an instance of draw polyline action
// the polyline vertices will be only added when
// the pointer is clicked on the view
let action = draw.create("polyline", {mode: "click"});

// fires when a vertex is added
action.on("vertex-add", function (evt) {
  measureLine(evt.vertices);
});

// fires when the pointer moves
action.on("cursor-update", function (evt) {
  measureLine(evt.vertices);
});

// fires when the drawing is completed
action.on("draw-complete", function (evt) {
  measureLine(evt.vertices);
});

// fires when a vertex is removed
action.on("vertex-remove", function (evt) {
  measureLine(evt.vertices);
});

function measureLine(vertices) {
  view.graphics.removeAll();

  let line = createLine(vertices);
  let lineLength = geometryEngine.geodesicLength(line, "miles");
  let graphic = createGraphic(line);
  view.graphics.add(graphic);
}

function createLine(vertices) {
  let polyline = {
    type: "polyline", // autocasts as new Polyline()
    paths: vertices,
    spatialReference: view.spatialReference
  }
  return polyline;
}
```

```javascript
// Typical usage
let draw = new Draw({
  view: view
});
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
let pointAction = draw.create("point");
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

