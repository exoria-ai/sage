# GroupElement

**Module:** `@arcgis/core/form/elements/GroupElement`

## Import

```javascript
import GroupElement from "@arcgis/core/form/elements/GroupElement.js";
```

```javascript
// CDN
const GroupElement = await $arcgis.import("@arcgis/core/form/elements/GroupElement.js");
```

**Since:** 4.16

## See Also

- FormTemplate
- FeatureForm
- FieldElement
- Sample - Update Feature Attributes
- Sample - Advanced Attribute Editing
- ExpressionInfo
- Sample - Update Feature Attributes
- Form Constraint Arcade Profile

## Property Details

### `GroupElement`

### `declaredClass`
- **Type:** `Inherited`

### `description`
- **Type:** `Inherited`

### `elements`

### `initialState`

### `label`
- **Type:** `Inherited`

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
const fieldElement1 = new FieldElement({
  fieldName: "inspector",
  label: "Inspector name"
});

const fieldElement2 = new FieldElement({
  fieldName: "inspdate",
  label: "Inspection date",
  description: "Date inspection was handled",
  input: { // autocastable to DateTimePickerInput
    type: "datetime-picker",
      includeTime: true,
      min: 1547678342000,
      max: 1610836742000
    }
});

const fieldElement3 = new FieldElement({
  fieldName: "placename",
  label: "Business name",
  editable: false
});

// Create the group element and pass in elements from above
const groupElement = new GroupElement({
  label: "Business contact information",
  description: "Enter the business contact name",
  elements:[fieldElement1, fieldElement2, fieldElement3]
});

// Next pass in any elements to the FormTemplate
const formTemplate = new FormTemplate({
  title: "Inspector report",
  description: "Enter all relevant information below",
  elements: [groupElement] // Add group element to the template
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

