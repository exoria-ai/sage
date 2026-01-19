# UtilityNetworkAssociationsElement

**Module:** `@arcgis/core/form/elements/UtilityNetworkAssociationsElement`

## Import

```javascript
import UtilityNetworkAssociationsElement from "@arcgis/core/form/elements/UtilityNetworkAssociationsElement.js";
```

```javascript
// CDN
const UtilityNetworkAssociationsElement = await $arcgis.import("@arcgis/core/form/elements/UtilityNetworkAssociationsElement.js");
```

**Since:** 4.32

## See Also

- FormTemplate
- Editor
- FeatureForm
- Sample - Edit FeatureLayers with form elements
- Form Constraint Arcade Profile
- ExpressionInfo
- Sample - Update Feature Attributes
- Form Constraint Arcade Profile

## Property Details

### `UtilityNetworkAssociationsElement`

### `associationTypes`

### `declaredClass`
- **Type:** `Inherited`

### `description`
- **Type:** `Inherited`

### `editableExpression`

### `label`
- **Type:** `Inherited`

### `type`

### `visibilityExpression`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

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
// Configure associations in forms
const formTemplate = new FormTemplate({
  title:"My Associations",
  description: "Provide information for feature",
  elements: [{ // Autocasts to new UtilityNetworkAssociationsElement
    type: "utilityNetworkAssociations",
    label: "Inspector Information",
    description: "Field inspector information",
    associationTypes: [
      {
       type: "content",
       title: "myContents"
      },
      {
       type: "container",
       associatedAssetGroup: 2,
       associatedNetworkSourceId: 5,
       associatedAssetType: 3
      },
      {
       type: "connectivity",
       description: "Describe this associations"
      },
      {
       type: "attachment"
      },
      {
       type: "structure"
      }
     ],
   }]
 })
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

