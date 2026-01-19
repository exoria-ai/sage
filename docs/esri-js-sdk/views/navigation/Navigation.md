# Navigation

**Module:** `@arcgis/core/views/navigation/Navigation`

## Import

```javascript
import Navigation from "@arcgis/core/views/navigation/Navigation.js";
```

```javascript
// CDN
const Navigation = await $arcgis.import("@arcgis/core/views/navigation/Navigation.js");
```

**Since:** 4.9

## Property Details

### `actionMap`

### `browserTouchPanEnabled`

### `declaredClass`
- **Type:** `Inherited`

### `gamepad`

### `momentumEnabled`

### `mouseWheelZoomEnabled`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// By default, dragging the middle mouse button (tertiary button) zooms the SceneView. By setting the tertiary
// drag action to "none", that default behavior can be disabled.
view.navigation.actionMap.dragTertiary = "none";
```

```javascript
// Disable single touch panning in a MapView.
const view = new MapView({
  container: "viewDiv",
  map: new Map({
    basemap: "streets-vector"
  })
});
view.navigation.browserTouchPanEnabled = false;
```

```javascript
// Disable the gamepad usage in MapView
const view = new MapView({
  container: "viewDiv",
  map: new Map({
    basemap: "satellite"
  }),
  center: [176.185, -37.643],
  zoom: 13,
  navigation: {
    gamepad: {
      enabled: false
    }
  }
});

// Disable gamepad usage in SceneView.
const view = new SceneView({
  container: "viewDiv",
  map: new Map({
    basemap: "satellite",
    ground: "world-elevation"
  }),
  camera: {
    position: [176.171, -37.660, 2000],
    heading: 0,
    tilt: 60
  },
  navigation: {
    gamepad: {
      enabled: false
    }
  }
});
```

```javascript
// Disable pan animation in the MapView.
const view = new MapView({
  container: "viewDiv",
  map: new Map({
    basemap: "streets-vector"
  })
});
view.navigation.momentumEnabled = false;
```

```javascript
// To disable mouse wheel zooming in a MapView.
const view = new MapView({
  container: "viewDiv",
  map: new Map({
    basemap: "streets-vector"
  })
});
view.navigation.mouseWheelZoomEnabled = false;
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

