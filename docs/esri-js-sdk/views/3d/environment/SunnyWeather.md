# SunnyWeather

**Module:** `@arcgis/core/views/3d/environment/SunnyWeather`

## Import

```javascript
import SunnyWeather from "@arcgis/core/views/3d/environment/SunnyWeather.js";
```

```javascript
// CDN
const SunnyWeather = await $arcgis.import("@arcgis/core/views/3d/environment/SunnyWeather.js");
```

**Since:** 4.22

## See Also

- Sample - Weather visualization
- Sample - Weather component

## Property Details

### `SunnyWeather`

### `cloudCover`

### `declaredClass`
- **Type:** `Inherited`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
    weather: {
      type: "sunny",
      cloudCover: 0.8      // autocasts as new SunnyWeather({ cloudCover: 0.8 })
    }
  }
});
```

```javascript
view.environment.weather = {
   type: "sunny",
   cloudCover: 0.4   // autocasts as new SunnyWeather({ cloudCover: 0.4 })
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

