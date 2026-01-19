# RelationshipElement

**Module:** `@arcgis/core/form/elements/RelationshipElement`

## Import

```javascript
import RelationshipElement from "@arcgis/core/form/elements/RelationshipElement.js";
```

```javascript
// CDN
const RelationshipElement = await $arcgis.import("@arcgis/core/form/elements/RelationshipElement.js");
```

**Since:** 4.27

## See Also

- FormTemplate
- Editor
- FeatureForm
- Sample - Edit FeatureLayers with form elements
- Sample - Editing related data with calculated expressions
- Form Constraint Arcade Profile
- ExpressionInfo
- Sample - Update Feature Attributes
- Form Constraint Arcade Profile

## Property Details

### `RelationshipElement`

### `declaredClass`
- **Type:** `Inherited`

### `description`
- **Type:** `Inherited`

### `displayCount`

### `displayType`

### `editableExpression`

### `label`
- **Type:** `Inherited`

### `orderByFields`

### `relationshipId`

### `type`

### `visibilityExpression`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create the relationship element
const relationshipElement = new RelationshipElement({
  description: "Past and present building owners",
  displayCount: 5,
  label: "Building owners",
  orderByFields: [{ //autocastable to RelatedRecordsInfoFieldOrder
    field: "owner_name",
    order: "desc"
  }],
  relationshipId: 0
});
```

```javascript
// Expression created within ExpressionInfos and is referenced in element
const expression = new ExpressionInfo({
  name: "alwaysHidden",
  expression: "false"
});

// Reference an already-defined visibilityExpression set within the ExpressionInfos
const fieldElement = new FieldElement({
  type: "field",
  fieldName: "inspemail",
  label: "Email address",
  visibilityExpression: "alwaysHidden"
});

formTemplate.expressionInfos = [ expression ];
formTemplate.elements = [ fieldElement ];
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

