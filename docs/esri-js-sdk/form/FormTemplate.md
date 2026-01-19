# FormTemplate

**Module:** `@arcgis/core/form/FormTemplate`

## Import

```javascript
import FormTemplate from "@arcgis/core/form/FormTemplate.js";
```

```javascript
// CDN
const FormTemplate = await $arcgis.import("@arcgis/core/form/FormTemplate.js");
```

**Since:** 4.16

## See Also

- Sample - Update Feature Attributes
- Sample - Advanced Attribute Editing
- Sample - Update FeatureLayer using applyEdits()
- Sample - Editing with calculated field expressions
- Sample - Edit FeatureLayers with form elements
- Sample - Editing related data with calculated expressions
- FeatureForm.formTemplate
- FeatureFormViewModel.formTemplate
- FeatureLayer.formTemplate
- SubtypeSublayer.formTemplate
- Editor.layerInfos.formTemplate
- Web Map Specification - formInfo
- FieldElement
- GroupElement
- RelationshipElement
- TextElement
- UtilityNetworkAssociationsElement
- Element.visibilityExpression
- Sample - Update Feature Attributes
- Sample - Editing related data with calculated expressions
- Sample - Editing with calculated field expressions
- Form Constraint Profile Specification
- Form Calculation Profile Specification
- FieldElement.visibilityExpression

## Property Details

### `FormTemplate`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `elements`

### `expressionInfos`

### `preserveFieldValuesWhenHidden`

### `title`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `getFieldsUsed`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a FieldElement
const fieldElement = new FieldElement({
  fieldName: "inspector",
  label: "Inspector name"
});

// Create a TextElement
const textElement = new TextElement({
  textFormat: "markdown",
  text: "**This text is bold.**"
});

// Create the group element and pass in the field and text elements
const groupElement = new GroupElement({
  label: "This is a group",
  elements: [fieldElement, textElement]
});

// Create the Form template and pass in elements
const formTemplate = new FormTemplate({
  title: "Inspector report",
  description: "Enter all relevant information below",
  elements: [groupElement] // Add all elements to the template
});

// Add a new feature form with grouped fields
const form = new FeatureForm({
  container: "form",
  groupDisplay: "sequential", // only display one group at a time
  formTemplate: formTemplate // set it to template created above
});

// Add a formtemplate to a feature layer
const featureLayer = new FeatureLayer({
 url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0",
 outFields: ["*"],
 formTemplate: formTemplate
});
map.add(featureLayer);

// Add a formtemplate to a subtype sublayer
const sublayer = new SubtypeSublayer({
  layer: featureLayer,
  subtype: "1",
  formTemplate: formTemplate
});

// Add a formtemplate to the Editor's layerInfos
const editor = new Editor({
  view: view,
  layerInfos: [
  {
    layer: featureLayer,
    formTemplate: formTemplate
  }]
});
```

```javascript
formTemplate.description = "The population of {County}, {State} is: {Population}";
```

```javascript
// Create a new form template
const formTemplate = new FormTemplate({
  title: "Damage assessments",
  description: "Provide information for insurance",
  elements: [{ // Autocasts to new GroupElement
    type: "group",
    label: "Inspector Information",
    description: "Field inspector information",
    elements: [{
      // Autocasts to new FieldElement
      type: "field",
      fieldName: "inspector",
      label: "name"
    },{
      type: "field",
      fieldName: "inspemail",
      label: "Email address"
    },{
      type: "field",
      fieldName: "insp_date",
      label: "Date of inspection"
    }]
  }]
});
```

```javascript
formTemplate.title = "{County}, {State}";
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

