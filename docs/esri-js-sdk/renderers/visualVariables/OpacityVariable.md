# OpacityVariable

**Module:** `@arcgis/core/renderers/visualVariables/OpacityVariable`

## Import

```javascript
import OpacityVariable from "@arcgis/core/renderers/visualVariables/OpacityVariable.js";
```

```javascript
// CDN
const OpacityVariable = await $arcgis.import("@arcgis/core/renderers/visualVariables/OpacityVariable.js");
```

**Since:** 4.10

## See Also

- Sample - Add transparency to features based on field values
- Arcade - Visualization Profile

## Property Details

### `OpacityVariable`

### `declaredClass`
- **Type:** `Inherited`

### `field`
- **Type:** `Inherited`

### `legendOptions`
- **Type:** `Inherited`

### `normalizationField`

### `stops`

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
const opacityVisualVariable = {
  type: "opacity",
  field: "PERCENTAGE",
  // maps data values to opacity values
  stops: [
    { value: 0, opacity: 0.1 },
    { value: 100, opacity: 1 }
  ]
};
renderer.visualVariables = [ opacityVisualVariable ];
```

```javascript
// opacity visual variable with arcade
const opacityVisualVariable = {
  type: "opacity",
  // calculate a value to visualize with opacity
  valueExpression: "( $feature.TOT_VOTES / $feature.REG_VOTERS ) * 100",
  stops: [
    { value: 30, opacity: 0.15 },
    { value: 70, opacity: 0.15 }
  ]
};
renderer.visualVariables = [ opacityVisualVariable ];
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

