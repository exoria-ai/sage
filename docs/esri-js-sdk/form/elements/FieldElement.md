# FieldElement

**Module:** `@arcgis/core/form/elements/FieldElement`

## Import

```javascript
import FieldElement from "@arcgis/core/form/elements/FieldElement.js";
```

```javascript
// CDN
const FieldElement = await $arcgis.import("@arcgis/core/form/elements/FieldElement.js");
```

**Since:** 4.16

## See Also

- FormTemplate
- FeatureForm
- GroupElement
- Field
- Sample - Editor using calculated expressions
- Sample - Update Feature Attributes
- Sample - Advanced Attribute Editing
- Sample - Advanced Attribute Editing
- Form Constraint Arcade Profile
- Form Constraint Arcade Profile
- Sample - Editing with calculated field expressions
- Form Calculation Arcade Profile
- ExpressionInfo
- Sample - Update Feature Attributes
- Form Constraint Arcade Profile

## Property Details

### `FieldElement`

### `declaredClass`
- **Type:** `Inherited`

### `description`
- **Type:** `Inherited`

### `domain`

### `editableExpression`

### `fieldName`

### `hint`

### `input`

### `label`
- **Type:** `Inherited`

### `requiredExpression`

### `type`

### `valueExpression`

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
// Create the field element
const fieldElement1 = new FieldElement({
  fieldName: "inspector",
  label: "Inspector name"
});

const fieldElement2 = new FieldElement({
  fieldName: "inspdate",
  label: "Inspection date",
  description: "Date inspection was handled",
  input: { // autocastable to DatePickerInput
    type: "date-picker",
      min: "2010-01-15",
      max: "2030-01-15"
    }
});

const fieldElement3 = new FieldElement({
  fieldName: "placename",
  label: "Business name",
  editableExpression: "editing-disabled"
});

const fieldElement4 = new FieldElement({
  fieldName: "floodinsur",
  label: "Flood insurance",
  input: { // autocastable to RadioButtonsInput
    type: "radio-buttons",
    noValueOptionLabel: "Not applicable",
    showNoValueOption: true
  }
});

// Next pass in any elements to the FormTemplate
const formTemplate = new FormTemplate({
  title: "Inspector report",
  description: "Enter all relevant information below",
  expressionInfos: [{
    name: "editing-disabled",
    expression: "false",
    returnType: "boolean"
  }],
  elements: [fieldElement1, fieldElement2, fieldElement3, fieldElement4] // Add all elements to the template
});
```

```javascript
// The diameter field requires a value to be created or edited
// if the inspectionStatus value is "Complete"
// if the status is not complete, then this field value is optional
const dbhFieldElement = new FieldElement({
  fieldName: "diameter",
  input: {
    type: "text-box"
  },
  requiredExpression: "tree-dbh",
  editableExpression: "editable"
});

layer.formTemplate = new FormTemplate({
  elements: [ dbhFieldElement ],
  expressionInfos: [{
    expression: "$feature.inspectionStatus == 'Complete'",
    name: "tree-dbh",
    title: "Tree DBH",
    returnType: "boolean"
  }, {
    expression: "true",
    name: "editable",
    returnType: "boolean"
  }]
});
```

```javascript
// The field value will ALWAYS be required when editing with a form
const dbhFieldElement = new FieldElement({
  editable: true,
  fieldName: "diameter",
  input: {
    type: "text-box"
  },
  requiredExpression: "always-required",
  editableExpression: "editable"
});

layer.formTemplate = new FormTemplate({
  elements: [ dbhFieldElement ],
  expressionInfos: [{
    // An expression that always returns true
    expression: "true",
    name: "always-required",
    returnType: "boolean"
  }, {
    expression: "true",
    name: "editable",
    returnType: "boolean"
  }]
});
```

```javascript
// Calculates the diameter based on the circumference field
const dbhFieldElement = new FieldElement({
  fieldName: "diameter",
  input: {
    type: "text-box"
  },
  valueExpression: "tree-dbh",
  // element must not be editable to enable valueExpression
  editableExpression: "not-editable"
});

layer.formTemplate = new FormTemplate({
  elements: [ dbhFieldElement ],
  expressionInfos: [{
    expression: "Round(DefaultValue($feature.circumference, 0) / PI, 1)",
    name: "tree-dbh",
    title: "Tree DBH",
    returnType: "boolean"
  }, {
    expression: "false",
    name: "not-editable",
    returnType: "boolean"
  }]
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

