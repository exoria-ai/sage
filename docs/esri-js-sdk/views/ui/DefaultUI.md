# DefaultUI

**Module:** `@arcgis/core/views/ui/DefaultUI`

## Import

```javascript
import DefaultUI from "@arcgis/core/views/ui/DefaultUI.js";
```

```javascript
// CDN
const DefaultUI = await $arcgis.import("@arcgis/core/views/ui/DefaultUI.js");
```

**Since:** 4.0

## See Also

- SceneView.ui
- MapView.ui
- SceneView.container
- View2D.container

## Property Details

### `DefaultUI`

### `components`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `height`
- **Type:** `Inherited`

### `padding`
- **Type:** `Inherited`

### `view`
- **Type:** `Inherited`

### `width`
- **Type:** `Inherited`

### `add`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `empty`
- **Type:** `Inherited`

### `find`
- **Type:** `Inherited`

### `getComponents`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `move`
- **Type:** `Inherited`

### `remove`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let searchWidget = new Search({ view: view });
let bmToggleWidget = new BasemapToggle({
  view: view,
  nextBasemap: "hybrid"
});

view.ui.add(searchWidget, "top-right");
view.ui.add(bmToggleWidget, "bottom-right");
```

```javascript
// Removes all default UI components, except Attribution.
// Passing an empty array will remove all components.
view.ui.components = [ "attribution" ];
```

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

