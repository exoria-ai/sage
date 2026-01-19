# ColorVariable

**Module:** `@arcgis/core/renderers/visualVariables/ColorVariable`

## Import

```javascript
import ColorVariable from "@arcgis/core/renderers/visualVariables/ColorVariable.js";
```

```javascript
// CDN
const ColorVariable = await $arcgis.import("@arcgis/core/renderers/visualVariables/ColorVariable.js");
```

**Since:** 4.10

## See Also

- Sample - Continuous color
- Guide - Esri color ramps
- Guide - Visualization best practices
- Sample - Visualize features thematically with extrusion
- Sample - Visualize features thematically with multiple variables (3D)
- Sample - Visualize features thematically with multiple variables (2D)
- Arcade - Visualization Profile

## Property Details

### `ColorVariable`

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
// Population per square kilometer
const colorVisVar = {
  type: "color",
  field: "POPULATION",
  normalizationField: "SQ_KM",
  stops: [
    { value: 30, color: "#fffcd4" },
    { value: 6000, color: "#0d2644" }
  ],
  legendOptions: {
    title: "Population per square kilometer"
  }
};
renderer.visualVariables = [ colorVisVar ];
```

```javascript
// color visual variable with arcade expression
// voter turnout
const colorVisVar = {
  type: "color",
  valueExpression: "( $feature.TOT_VOTES / $feature.REG_VOTERS ) * 100",
  valueExpressionTitle: "Voter Turnout",
  stops: [
    { value: 30, color: "#fffcd4" },
    { value: 70, color: "#0d2644" }
  ]
};
renderer.visualVariables = [ colorVisVar ];
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

