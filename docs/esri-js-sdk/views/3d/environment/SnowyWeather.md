# SnowyWeather

**Module:** `@arcgis/core/views/3d/environment/SnowyWeather`

## Import

```javascript
import SnowyWeather from "@arcgis/core/views/3d/environment/SnowyWeather.js";
```

```javascript
// CDN
const SnowyWeather = await $arcgis.import("@arcgis/core/views/3d/environment/SnowyWeather.js");
```

**Since:** 4.24

## See Also

- Sample - Weather visualization
- Sample - Weather component

## Property Details

### `SnowyWeather`

### `cloudCover`

### `declaredClass`
- **Type:** `Inherited`

### `precipitation`

### `snowCover`

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
      type: "snowy",
      cloudCover: 0.8,
      precipitation: 0.3,
      snowCover: "enabled"   // autocasts as new SnowyWeather({ cloudCover: 0.8, precipitation: 0.3, snowCover: "enabled" })
    }
  }
});
```

```javascript
view.environment.weather = {
   type: "snowy",
   cloudCover: 0.4,
   precipitation: 0.3   // autocasts as new SnowyWeather({ cloudCover: 0.4, precipitation: 0.3, snowCover: "disabled" })
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

