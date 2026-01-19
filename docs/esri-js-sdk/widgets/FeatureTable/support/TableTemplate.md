# TableTemplate

**Module:** `@arcgis/core/widgets/FeatureTable/support/TableTemplate`

## Import

```javascript
import TableTemplate from "@arcgis/core/widgets/FeatureTable/support/TableTemplate.js";
```

```javascript
// CDN
const TableTemplate = await $arcgis.import("@arcgis/core/widgets/FeatureTable/support/TableTemplate.js");
```

**Since:** 4.24

## See Also

- FieldColumnTemplate
- GroupColumnTemplate

## Property Details

### `TableTemplate`

### `columnTemplates`

### `declaredClass`
- **Type:** `Inherited`

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
const tableTemplate = new TableTemplate({
  columnTemplates: [ // takes an array of FieldColumnTemplate and GroupColumnTemplate
  { // autocasts to FieldColumnTemplate
    type: "field",
    fieldName: "ObjectId",
    direction: "asc", // In order to use initialSortPriority, make sure direction is set
    initialSortPriority: 1 // This field's sort order takes the second-highest priority.
  },
  {
    type: "field",
    fieldName: "NAME",
    label: "Name",
    direction: "asc", // In order to use initialSortPriority, make sure direction is set
    initialSortPriority: 0 // This field's sort order takes the highest priority
  },
  {
    type: "field",
    fieldName: "STATUS",
    label: "Status",
    direction: "asc", // In order to use initialSortPriority, make sure direction is set
    initialSortPriority: 2 // This field's sort order is prioritized after Name and ObjectId, respectively.
  }]
});
```

```javascript
const tableTemplate = new TableTemplate({
  columnTemplates: [
  { // autocasts to FieldColumnTemplate
    type: "field",
    fieldName: "ObjectId",
    direction: "asc",
    initialSortPriority: 1 // This field's sort order takes the second-highest priority.
  },
  {
    type: "field",
    fieldName: "NAME",
    label: "Name",
    initialSortPriority: 0 // This field's sort order takes the highest priority
  },
  {
    type: "field",
    fieldName: "STATUS",
    label: "Status",
    direction: "asc",
    initialSortPriority: 2 // This field's sort order is prioritized after Name and ObjectId, respectively.
  }]
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

