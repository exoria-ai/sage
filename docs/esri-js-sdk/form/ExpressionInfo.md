# ExpressionInfo

**Module:** `@arcgis/core/form/ExpressionInfo`

## Import

```javascript
import ExpressionInfo from "@arcgis/core/form/ExpressionInfo.js";
```

```javascript
// CDN
const ExpressionInfo = await $arcgis.import("@arcgis/core/form/ExpressionInfo.js");
```

**Since:** 4.16

## See Also

- FormTemplate
- FieldElement.visibilityExpression
- GroupElement.visibilityExpression
- FieldElement.requiredExpression
- FieldElement.editableExpression
- FieldElement.valueExpression
- RelationshipElement.visibilityExpression
- Sample - Editor using calculated expressions
- Form Constraint Profile Specification
- Form Calculation Profile
- Form Constraint Arcade Profile
- Form Calculation
- Form Constraint Arcade Profile
- Form Calculation

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
// Sets the visibility of a field in the form template only if the date is within the last 24 hours.
expressionInfo.expression = "IIF(DateDiff(Now(), $feature.incident_date, 'hours') < 24)";
```

```javascript
expressionInfo.name = "withinRange";
```

```javascript
expressionInfo.title = "Did the incident occur within the last 24 hours?";
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

