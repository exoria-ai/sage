# UI

**Module:** `@arcgis/core/views/ui/UI`

## Import

```javascript
import UI from "@arcgis/core/views/ui/UI.js";
```

```javascript
// CDN
const UI = await $arcgis.import("@arcgis/core/views/ui/UI.js");
```

**Since:** 4.0

## See Also

- SceneView.ui
- MapView.ui
- Guide - Localization
- SceneView.container
- View2D.container

## Property Details

### `UI`

### `container`

### `declaredClass`
- **Type:** `Inherited`

### `height`

### `padding`

### `view`

### `width`

### `add`

### `addHandles`
- **Type:** `Inherited`

### `empty`

### `find`

### `getComponents`

### `hasHandles`
- **Type:** `Inherited`

### `move`

### `remove`

### `removeHandles`
- **Type:** `Inherited`

### `UIPosition`


## Method Details

### `Method Details()`


## Examples

```javascript
// Setting a single number to this property
ui.padding = 0;
// is the same as setting it on all properties of the object
ui.padding = { top: 0, left: 0, right: 0, bottom: 0 };
```

```javascript
let toggle = new BasemapToggle({
  view: view,
  nextBasemap: "hybrid"
});
// Adds an instance of BasemapToggle widget to the
// top right of the view's container.
view.ui.add(toggle, "top-right");
```

```javascript
// Adds multiple widgets to the top right of the view
view.ui.add([ compass, toggle ], "top-leading");
```

```javascript
// Adds multiple components of different types to the bottom left of the view
view.ui.add([ searchWidget, "infoDiv" ], "bottom-left");
```

```javascript
// Adds multiple components of various types to different view positions
view.ui.add([
  {
    component: compassWidget,
    position: "top-left",
    index: 0
  }, {
    component: "infoDiv",
    position: "bottom-trailing"
  }, {
    component: searchWidget,
    position: "top-right",
    index: 0
  }, {
    component: legendWidgetDomNode,
    position: "top-right",
    index: 1
  }
]);
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

