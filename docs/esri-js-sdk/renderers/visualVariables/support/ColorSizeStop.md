# ColorSizeStop

**Module:** `@arcgis/core/renderers/visualVariables/support/ColorSizeStop`

## Import

```javascript
import ColorSizeStop from "@arcgis/core/renderers/visualVariables/support/ColorSizeStop.js";
```

```javascript
// CDN
const ColorSizeStop = await $arcgis.import("@arcgis/core/renderers/visualVariables/support/ColorSizeStop.js");
```

**Since:** 4.12

## See Also

- ColorSizeSlider.stops

## Property Details

### `ColorSizeStop`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `label`

### `size`

### `value`

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
// Creates a deep clone of the visual variable
const stops = renderer.visualVariables[0].stops.map(function(stop){
  return stop.clone();
});
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

