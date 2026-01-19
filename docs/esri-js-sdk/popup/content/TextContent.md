# TextContent

**Module:** `@arcgis/core/popup/content/TextContent`

## Import

```javascript
import TextContent from "@arcgis/core/popup/content/TextContent.js";
```

```javascript
// CDN
const TextContent = await $arcgis.import("@arcgis/core/popup/content/TextContent.js");
```

**Since:** 4.11

## See Also

- PopupTemplate
- ExpressionInfo
- Sample - Intro to PopupTemplate
- Sample - Multiple popup elements
- Sample - PopupTemplate function
- Sample - PopupTemplate with promise
- PopupTemplate.expressionInfos

## Property Details

### `TextContent`

### `declaredClass`
- **Type:** `Inherited`

### `text`

### `type`

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
// Create the Text Content Element
// This element uses an attribute from the featurelayer which displays a sentence
// giving the total amount of trees value within a specified census block.
let textElement = new TextContent();
textElement.text = "There are {Point_Count} trees within census block {BLOCKCE10}";

// // Create the PopupTemplate
let template = new PopupTemplate({
  title: "Beverly Hills trees by block",
  outFields: ["*"],
  content: [textElement]
});
```

```javascript
layer.popupTemplate = {
  content: [{
    type: "text", // Autocasts as new TextContent
    text: "The {expression/predominance-tree} species occurs more often"
      + " than other tree species in the area."
  }]
};
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

