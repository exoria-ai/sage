# ColorStop

**Module:** `@arcgis/core/renderers/visualVariables/support/ColorStop`

## Import

```javascript
import ColorStop from "@arcgis/core/renderers/visualVariables/support/ColorStop.js";
```

```javascript
// CDN
const ColorStop = await $arcgis.import("@arcgis/core/renderers/visualVariables/support/ColorStop.js");
```

**Since:** 4.10

## See Also

- ColorVariable
- Guide - Esri color ramps
- Guide - Visualization best practices

## Property Details

### `ColorStop`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `label`

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

