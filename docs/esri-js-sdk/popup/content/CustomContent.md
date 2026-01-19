# CustomContent

**Module:** `@arcgis/core/popup/content/CustomContent`

## Import

```javascript
import CustomContent from "@arcgis/core/popup/content/CustomContent.js";
```

```javascript
// CDN
const CustomContent = await $arcgis.import("@arcgis/core/popup/content/CustomContent.js");
```

**Since:** 4.16

## See Also

- PopupTemplate
- Content
- Sample - Intro to PopupTemplate
- Sample - Custom popup content elements
- outFields

## Property Details

### `CustomContent`

### `creator`

### `declaredClass`
- **Type:** `Inherited`

### `destroyer`

### `outFields`

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

### `PopupTemplateContent`

### `PopupTemplateContentCreator`

### `PopupTemplateContentDestroyer`

### `PopupTemplateCreatorEvent`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create the custom content for the CustomContent popup element
// Creates some custom content
let customContentWidget = new CustomContent({
  outFields: ["*"],
  creator: (event) => {
    // creator function returns either string, HTMLElement, Widget, or Promise
  }
});
```

```javascript
// This custom content contains a widget
let customContentWidget = new CustomContent({
  outFields: ["*"],
  creator: () => {
    home = new Home({
      view: view
    });
  return home;
  }
});
```

```javascript
// This custom content returns a promise
let customContentWidget = new CustomContent({
  outFields: ["*"],
  creator: () => {
      const image = document.createElement("img");
      image.src = "<url to image>";
      image.width = 100;
      return image;
  }
});
```

```javascript
// This custom content contains the resulting promise from the query
const customContentQuery = new CustomContent({
 outFields: ["*"],
 creator: (event) => {
   const queryObject = new Query({
     geometry: event.graphic.geometry,
     outFields: ["*"],
     spatialRelationship: "intersects",
     returnGeometry: true
   });
   return query.executeForCount(queryUrl, queryObject).then((count) => {
     return `There are ${count} features that intersect with ${event.graphic.attributes["field_name"]}.`;
   },
   (error) => {
     console.log(error);
   });
 }
});
```

```javascript
// Destroy the custom content
let customContent = new CustomContent({
  ...
  destroyer: () => {
    // destroy custom content here
  }
});
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

