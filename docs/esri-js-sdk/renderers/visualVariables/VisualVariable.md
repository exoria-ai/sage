# VisualVariable

**Module:** `@arcgis/core/renderers/visualVariables/VisualVariable`

## Import

```javascript
import VisualVariable from "@arcgis/core/renderers/visualVariables/VisualVariable.js";
```

```javascript
// CDN
const VisualVariable = await $arcgis.import("@arcgis/core/renderers/visualVariables/VisualVariable.js");
```

**Since:** 4.10

## See Also

- SimpleRenderer.visualVariables
- UniqueValueRenderer.visualVariables
- ClassBreaksRenderer.visualVariables
- VectorFieldRenderer.visualVariables
- Arcade - Visualization Profile

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `field`

### `legendOptions`

### `type`

### `valueExpression`

### `valueExpressionTitle`

### `addHandles`
- **Type:** `Inherited`

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

