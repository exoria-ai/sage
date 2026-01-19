# WeatherViewModel

**Module:** `@arcgis/core/widgets/Weather/WeatherViewModel`

## Import

```javascript
import WeatherViewModel from "@arcgis/core/widgets/Weather/WeatherViewModel.js";
```

```javascript
// CDN
const WeatherViewModel = await $arcgis.import("@arcgis/core/widgets/Weather/WeatherViewModel.js");
```

**Since:** 4.23

## See Also

- Weather
- Sample - Weather visualization
- Programming patterns: Widget viewModel pattern

## Property Details

### `WeatherViewModel`

### `declaredClass`
- **Type:** `Inherited`

### `state`

### `view`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `setWeatherByType`


## Method Details

### `Method Details()`


## Examples

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

