# RelationshipColumnTemplate

**Module:** `@arcgis/core/widgets/FeatureTable/support/RelationshipColumnTemplate`

## Import

```javascript
import RelationshipColumnTemplate from "@arcgis/core/widgets/FeatureTable/support/RelationshipColumnTemplate.js";
```

```javascript
// CDN
const RelationshipColumnTemplate = await $arcgis.import("@arcgis/core/widgets/FeatureTable/support/RelationshipColumnTemplate.js");
```

**Since:** 4.31

## See Also

- FeatureTable
- TableTemplate
- GroupColumnTemplate
- Sample - FeatureTable with a map
- Sample - FeatureTable with related records
- Sample - FeatureTable with row highlights
- FieldColumn.description
- FieldColumn.effectiveDescription
- FeatureTable.multiSortEnabled
- initialSortPriority
- Calcite Icon Search
- Calcite Icon Search
- FeatureTable.multiSortEnabled
- direction
- FeatureTable.sortColumn()
- Sample - FeatureTable widget
- MapView.timeZone

## Property Details

### `RelationshipColumnTemplate`

### `autoWidth`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `description`
- **Type:** `Inherited`

### `direction`
- **Type:** `Inherited`

### `fieldName`
- **Type:** `Inherited`

### `flexGrow`
- **Type:** `Inherited`

### `formatFunction`
- **Type:** `Inherited`

### `frozen`
- **Type:** `Inherited`

### `frozenToEnd`
- **Type:** `Inherited`

### `icon`
- **Type:** `Inherited`

### `iconText`
- **Type:** `Inherited`

### `initialSortPriority`
- **Type:** `Inherited`

### `invalid`
- **Type:** `Inherited`

### `label`
- **Type:** `Inherited`

### `labelTooltipText`
- **Type:** `Inherited`

### `menuConfig`
- **Type:** `Inherited`

### `resizable`
- **Type:** `Inherited`

### `sortable`
- **Type:** `Inherited`

### `textAlign`
- **Type:** `Inherited`

### `textWrap`
- **Type:** `Inherited`

### `timeZone`
- **Type:** `Inherited`

### `type`

### `visible`
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
const relationshipColumnTemplate = new RelationshipColumnTemplate({
  label: "Attachments",
  relationshipId: 1
});
```

```javascript
// The following example demonstrates how to use the formatFunction property to create a custom cell renderer that displays a progress bar in the cell. The progress bar can be used to show the progress of a task.
columnTemplate.formatFunction = ({ column, feature, index, value })=> {
  const progress = document.createElement("progress");
  progress.max = 100;
  progress.value = value;
  return progress;
};
```

```javascript
const table = new FeatureTable({
  layer: featureLayer,
  multiSortEnabled: true,
  tableTemplate: { // autocastable to TableTemplate
    columnTemplates: [{ // autocastable to FieldColumnTemplate
      type: "field",
      fieldName: "ObjectId",
      direction: "asc",
      initialSortPriority: 1, // This field's sort order takes second-highest priority.
    },
    {
      type: "field",
      fieldName: "Name",
      direction: "asc",
      initialSortPriority: 0, // This field's sort order takes the highest priority.
    },
    {
      type: "field",
      fieldName: "Status",
      direction: "asc",
      initialSortPriority: 2 // This field's sort order is prioritized after Name and ObjectId, respectively.
    }]
  }
  container: "tableDiv"
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

