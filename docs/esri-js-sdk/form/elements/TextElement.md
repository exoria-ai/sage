# TextElement

**Module:** `@arcgis/core/form/elements/TextElement`

## Import

```javascript
import TextElement from "@arcgis/core/form/elements/TextElement.js";
```

```javascript
// CDN
const TextElement = await $arcgis.import("@arcgis/core/form/elements/TextElement.js");
```

## See Also

- FormTemplate
- FeatureForm
- ExpressionInfo
- Sample - Edit FeatureLayers with form elements
- ExpressionInfo
- Sample - Update Feature Attributes
- Form Constraint Arcade Profile

## Property Details

### `TextElement`

### `declaredClass`
- **Type:** `Inherited`

### `text`

### `textFormat`

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
// Create a plain-text element.
const textElement = new TextElement({
  text: "Tree species: {COMMONNAME}."
});

// Create a markdown text element with italics and bold text.
const markdownTextElement = new TextElement({
  textFormat: "markdown",
  text: "_This text is italicized_ & **This text is bold.**"
});

layer.formTemplate = new FormTemplate({
  title: "Plain-text and markdown text elements",
  elements: [ textElement, markdownTextElement ]
});
```

```javascript
// This TextElement uses the markdown large heading.
const textElement = new TextElement({
  textFormat: "markdown",
  text: "##### This tree type is {COMMONNAME}."
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

