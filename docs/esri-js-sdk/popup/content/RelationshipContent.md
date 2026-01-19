# RelationshipContent

**Module:** `@arcgis/core/popup/content/RelationshipContent`

## Import

```javascript
import RelationshipContent from "@arcgis/core/popup/content/RelationshipContent.js";
```

```javascript
// CDN
const RelationshipContent = await $arcgis.import("@arcgis/core/popup/content/RelationshipContent.js");
```

**Since:** 4.25

## See Also

- PopupTemplate
- Content
- Sample - Browse related records in a popup

## Property Details

### `RelationshipContent`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `displayCount`

### `displayType`

### `orderByFields`

### `relationshipId`

### `title`

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
// Create the RelationshipContent popup element
const relationshipContent = new RelationshipContent({
  relationshipId: 3,
  title: "Cities in {COUNTY_NAME}",
  description: "All the cities that reside in {COUNTY_NAME}.",
  displayCount: 3,
  // Autocasts as new array of RelatedRecordsInfoFieldOrder objects
  orderByFields: [{
    field: "CITY",
    order: "asc"
  }]
});
```

```javascript
// Create the RelationshipContent popup element
// and add it to the popup template content for the layer.
layer.popupTemplate.content = [{
  // Autocasts as new RelationshipContent object
  type: "relationship",
  relationshipId: 1,
  title: "Hydrant Maintenance Inspections",
  description: "Hydrant maintenance inspections for {expression/asset}",
  displayCount: 5,
  // Autocasts as new array of RelatedRecordsInfoFieldOrder objects
  orderByFields: [{
    field: "INSTALLDATE",
    order: "desc"
  }]
}];
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

