# FieldColumnTemplate

**Module:** `@arcgis/core/widgets/FeatureTable/support/FieldColumnTemplate`

## Import

```javascript
import FieldColumnTemplate from "@arcgis/core/widgets/FeatureTable/support/FieldColumnTemplate.js";
```

```javascript
// CDN
const FieldColumnTemplate = await $arcgis.import("@arcgis/core/widgets/FeatureTable/support/FieldColumnTemplate.js");
```

**Since:** 4.24

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
- FieldColumnTemplate.editable
- Sample - FeatureTable widget with editing enabled
- Calcite Icon Search
- Calcite Icon Search
- FeatureTable.multiSortEnabled
- direction
- FeatureTable.sortColumn()
- Sample - FeatureTable widget
- MapView.timeZone

## Property Details

### `FieldColumnTemplate`

### `autoWidth`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `description`
- **Type:** `Inherited`

### `direction`
- **Type:** `Inherited`

### `domain`

### `editable`

### `fieldName`
- **Type:** `Inherited`

### `flexGrow`
- **Type:** `Inherited`

### `formatFunction`

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

### `required`

### `resizable`
- **Type:** `Inherited`

### `sortable`

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

### `FieldValueFormatFunction`


## Method Details

### `Method Details()`


## Examples

```javascript
const fieldColumnTemplate = new FieldColumnTemplate({
  fieldName: "full_name",
  label: "Full name",
  direction: "asc", // In order to use initialSortPriority, make sure direction is set
  initialSortPriority: 0 // This field's sort order takes the highest priority.
});
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

