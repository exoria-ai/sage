# SizeStop

**Module:** `@arcgis/core/renderers/visualVariables/support/SizeStop`

## Import

```javascript
import SizeStop from "@arcgis/core/renderers/visualVariables/support/SizeStop.js";
```

```javascript
// CDN
const SizeStop = await $arcgis.import("@arcgis/core/renderers/visualVariables/support/SizeStop.js");
```

**Since:** 4.10

## See Also

- SizeVariable

## Property Details

### `SizeStop`

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
// size defined in points
const sizeVisVar = {
  type: "size",
  field: "POPULATION",
  stops: [
    { value: 5000, size: 4 },
    { value: 1000000, size: 80 }
  ]
};
renderer.visualVariables = [ sizeVisVar ];
```

```javascript
// size defined with pixels
const sizeVisVar = {
  type: "size",
  field: "POPULATION",
  stops: [
    { value: 5000, size: "6px" },
    { value: 1000000, size: "120px" }
  ]
};
renderer.visualVariables = [ sizeVisVar ];
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

