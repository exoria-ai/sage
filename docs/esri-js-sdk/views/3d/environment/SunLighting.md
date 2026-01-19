# SunLighting

**Module:** `@arcgis/core/views/3d/environment/SunLighting`

## Import

```javascript
import SunLighting from "@arcgis/core/views/3d/environment/SunLighting.js";
```

```javascript
// CDN
const SunLighting = await $arcgis.import("@arcgis/core/views/3d/environment/SunLighting.js");
```

**Since:** 4.23

## See Also

- Sample - Daylight component

## Property Details

### `SunLighting`

### `cameraTrackingEnabled`

### `date`

### `declaredClass`
- **Type:** `Inherited`

### `directShadowsEnabled`
- **Type:** `Inherited`

### `displayUTCOffset`
- **Type:** `Inherited`

### `type`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `clone`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
let view = new SceneView({
  container: "viewDiv",

  map: new Map({
    basemap: "satellite",
    ground: "world-elevation"
  }),
  environment: {
    lighting: {
      type: "sun"    // autocasts as new SunLighting()
    }
  }
});
```

```javascript
view.environment.lighting = {
   type: "sun",
   directShadowsEnabled: true    // autocasts as new SunLighting({ directShadowsEnabled: true })
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
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

