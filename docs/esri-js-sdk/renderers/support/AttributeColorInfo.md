# AttributeColorInfo

**Module:** `@arcgis/core/renderers/support/AttributeColorInfo`

## Import

```javascript
import AttributeColorInfo from "@arcgis/core/renderers/support/AttributeColorInfo.js";
```

```javascript
// CDN
const AttributeColorInfo = await $arcgis.import("@arcgis/core/renderers/support/AttributeColorInfo.js");
```

**Since:** 4.11

## See Also

- DotDensityRenderer
- PieChartRenderer
- Arcade Visualization Profile

## Property Details

### `AttributeColorInfo`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `field`

### `label`

### `valueExpression`

### `valueExpressionTitle`

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
renderer.attributes = [{
  field: "POPULATION",
  label: "Population (2019)",
  color: "gray"
}];
```

```javascript
// Typical usage in a dot density renderer
renderer.attributes = [{
  field: "Population",
  color: "black"
}];
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
// Creates a deep clone of the renderer's first attribute object.
let attributeColorInfo = renderer.attributes[0].clone();
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

