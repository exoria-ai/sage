# OpacityStop

**Module:** `@arcgis/core/renderers/visualVariables/support/OpacityStop`

## Import

```javascript
import OpacityStop from "@arcgis/core/renderers/visualVariables/support/OpacityStop.js";
```

```javascript
// CDN
const OpacityStop = await $arcgis.import("@arcgis/core/renderers/visualVariables/support/OpacityStop.js");
```

**Since:** 4.10

## See Also

- OpacityVariable

## Property Details

### `OpacityStop`

### `declaredClass`
- **Type:** `Inherited`

### `label`

### `opacity`

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

