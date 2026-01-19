# ExpressionInfo

**Module:** `@arcgis/core/popup/ExpressionInfo`

## Import

```javascript
import ExpressionInfo from "@arcgis/core/popup/ExpressionInfo.js";
```

```javascript
// CDN
const ExpressionInfo = await $arcgis.import("@arcgis/core/popup/ExpressionInfo.js");
```

**Since:** 4.11

## See Also

- Arcade Popup Profile
- Arcade Feature Reduction Popup Profile
- PopupTemplate
- Sample - Reference Arcade expressions in PopupTemplate
- Arcade Popup Profile
- Arcade Feature Reduction Popup Profile

## Property Details

### `ExpressionInfo`

### `declaredClass`
- **Type:** `Inherited`

### `expression`

### `name`

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
// Display a table in the popup's content referencing two values
// one from a field, and another returned from an Arcade expression
layer.popupTemplate = {
  title: "Population in {NAME}",
  content: [{
    type: "fields",
    fieldInfos: [{
      fieldName: "POP_2015",
      label: "Total population (2015)",
      format: {
        digitSeparator: true
      }
    }, {
      fieldName: "expression/per-asian"
    }]
  }]
};
```

```javascript
// Calculates the percentage of the population that is Asian
expressionInfo.expression = "Text($feature.Asian / $feature.TOT_POP, '#.#%')";
```

```javascript
expressionInfo.name = "percent-asian";
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

