# Camera

**Module:** `@arcgis/core/Camera`

## Import

```javascript
import Camera from "@arcgis/core/Camera.js";
```

```javascript
// CDN
const Camera = await $arcgis.import("@arcgis/core/Camera.js");
```

**Since:** 4.0

## See Also

- SceneView.camera
- SceneView.goTo()
- Sample - Easy navigation
- Blog post - Introduction to camera

## Property Details

### `Camera`

### `declaredClass`
- **Type:** `Inherited`

### `fov`

### `heading`

### `layout`

### `position`

### `tilt`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// Initialize the view with a specific camera
const cam = new Camera({
  heading: 90, // face due east
  tilt: 45, // looking from a bird's eye view
  position: [ -122, 38, 20000 ]  // creates a point instance (x,y,z)
});
```

```javascript
// Initialize the view with a specific camera
const cam = new Camera({
  heading: 90, // face due east
  tilt: 45, // looking from a bird's eye view
  position: {
    latitude: 38,
    longitude: -122,
    z: 20000,
    spatialReference: { wkid: 3857 }
  }
});

view.camera = cam;
```

```javascript
// Set the heading of the view's camera to 180 degrees
const newCam = view.camera.clone();
newCam.heading = 180;
view.camera = newCam;
```

```javascript
// go to the pt geometry facing due south
view.goTo({ target: pt, heading: 180 });
```

```javascript
const cam = view.camera.clone();
// the position is autocast as new Point()
cam.position = {
  latitude: 38,
  longitude: -122,
  z: 50000  // altitude in meters
}
// go to the new camera
view.goTo(cam);
```

```javascript
// Initialize the view with a specific camera
const cam = new Camera({
  heading: 90, // face due east
  tilt: 45, // looking from a bird's eye view
  position: {
    latitude: 38,
    longitude: -122,
    spatialReference: { wkid: 3857 }
  }
});

view.camera = cam;
```

