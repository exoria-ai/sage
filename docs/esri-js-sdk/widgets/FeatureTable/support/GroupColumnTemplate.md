# GroupColumnTemplate

**Module:** `@arcgis/core/widgets/FeatureTable/support/GroupColumnTemplate`

## Import

```javascript
import GroupColumnTemplate from "@arcgis/core/widgets/FeatureTable/support/GroupColumnTemplate.js";
```

```javascript
// CDN
const GroupColumnTemplate = await $arcgis.import("@arcgis/core/widgets/FeatureTable/support/GroupColumnTemplate.js");
```

**Since:** 4.24

## See Also

- FeatureTable
- TableTemplate
- FieldColumnTemplate
- Sample - FeatureTable widget with editing enabled
- FieldColumnTemplate
- TableTemplate
- FieldColumn.description
- FieldColumn.effectiveDescription
- Calcite Icon Search
- Calcite Icon Search
- MapView.timeZone

## Property Details

### `GroupColumnTemplate`

### `autoWidth`
- **Type:** `Inherited`

### `columnTemplates`

### `declaredClass`
- **Type:** `Inherited`

### `description`
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

### `invalid`
- **Type:** `Inherited`

### `label`
- **Type:** `Inherited`

### `labelTooltipText`
- **Type:** `Inherited`

### `resizable`
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
const groupColumnTemplate = new GroupColumnTemplate({
  fieldName: "full_name",
  label: "Full name"
});
```

```javascript
// Create a new table template
const tableTemplate = new TableTemplate({
  columnTemplates: [{ // Autocasts to new GroupColumnTemplate
    type: "group",
    label: "Inspector information",
    columnTemplates: [{
      // Autocasts to new FieldColumnTemplate
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
// The following example demonstrates how to use the formatFunction property to create a custom cell renderer that displays a progress bar in the cell. The progress bar can be used to show the progress of a task.
columnTemplate.formatFunction = ({ column, feature, index, value })=> {
  const progress = document.createElement("progress");
  progress.max = 100;
  progress.value = value;
  return progress;
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

