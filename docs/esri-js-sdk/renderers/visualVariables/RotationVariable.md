# RotationVariable

**Module:** `@arcgis/core/renderers/visualVariables/RotationVariable`

## Import

```javascript
import RotationVariable from "@arcgis/core/renderers/visualVariables/RotationVariable.js";
```

```javascript
// CDN
const RotationVariable = await $arcgis.import("@arcgis/core/renderers/visualVariables/RotationVariable.js");
```

**Since:** 4.10

## See Also

- Sample - Visualize data with rotation
- Sample - 3D icon rotation
- Arcade - Visualization Profile

## Property Details

### `RotationVariable`

### `axis`

### `declaredClass`
- **Type:** `Inherited`

### `field`
- **Type:** `Inherited`

### `legendOptions`
- **Type:** `Inherited`

### `rotationType`

### `type`

### `valueExpression`
- **Type:** `Inherited`

### `valueExpressionTitle`
- **Type:** `Inherited`

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
const rotationVisualVariable = {
  type: "rotation",
  field: "heading",
  rotationType: "geographic"
};
renderer.visualVariables = [ rotationVisualVariable ];
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
let renderer = renderer.visualVariables[0].clone();
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

