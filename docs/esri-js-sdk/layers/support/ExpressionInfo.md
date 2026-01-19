# ExpressionInfo

**Module:** `@arcgis/core/layers/support/ExpressionInfo`

## Import

```javascript
import ExpressionInfo from "@arcgis/core/layers/support/ExpressionInfo.js";
```

```javascript
// CDN
const ExpressionInfo = await $arcgis.import("@arcgis/core/layers/support/ExpressionInfo.js");
```

**Since:** 4.25

## See Also

- Arcade Visualization Profile
- AggregateField.onStatisticExpression
- Arcade Visualization Profile

## Property Details

### `ExpressionInfo`

### `declaredClass`
- **Type:** `Inherited`

### `expression`

### `returnType`

### `title`

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
const expressionInfo = new ExpressionInfo({
  title: "Population per square kilometer",
  returnType: "number",
  expression: "$feature.population / AreaGeodetic($feature, 'square-kilometers')"
});
```

```javascript
// Calculates the percentage of the population that is Asian
expressionInfo.expression = "($feature.Asian / $feature.TOT_POP) * 100";
```

```javascript
expressionInfo.title = "Percent Asian";
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

