# GroupColumn

**Module:** `@arcgis/core/widgets/FeatureTable/Grid/GroupColumn`

## Import

```javascript
import GroupColumn from "@arcgis/core/widgets/FeatureTable/Grid/GroupColumn.js";
```

```javascript
// CDN
const GroupColumn = await $arcgis.import("@arcgis/core/widgets/FeatureTable/Grid/GroupColumn.js");
```

**Since:** 4.24

## See Also

- FeatureTable
- FeatureTableViewModel
- FieldColumn
- GroupColumnTemplate
- Sample - FeatureTable with editing enabled
- FeatureTable.multiSortEnabled
- initialSortPriority
- Calcite Icon Search
- Calcite Icon Search
- Wikipedia - List of tz database time zones
- Date-time queries | Time zone properties
- Column.openMenu
- FeatureTable.visibleElements.columnMenus
- direction
- Column.closeMenu
- FeatureTable.visibleElements.columnMenus
- initialSortPriority

## Property Details

### `GroupColumn`

### `autoWidth`
- **Type:** `Inherited`

### `columns`

### `declaredClass`
- **Type:** `Inherited`

### `description`
- **Type:** `Inherited`

### `direction`
- **Type:** `Inherited`

### `effectiveDescription`
- **Type:** `Inherited`

### `effectiveLabel`
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

### `hidden`
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

### `menu`
- **Type:** `Inherited`

### `menuConfig`
- **Type:** `Inherited`

### `menuIsOpen`
- **Type:** `Inherited`

### `menuIsVisible`
- **Type:** `Inherited`

### `resizable`
- **Type:** `Inherited`

### `sortable`

### `tableTimeZone`
- **Type:** `Inherited`

### `textAlign`
- **Type:** `Inherited`

### `textWrap`
- **Type:** `Inherited`

### `timeZone`
- **Type:** `Inherited`

### `visibleElements`
- **Type:** `Inherited`

### `width`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `closeMenu`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `openMenu`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `sort`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// The following example demonstrates how to use the formatFunction property to create a custom cell renderer that displays a progress bar in the cell. The progress bar can be used to show the progress of a task.
column.formatFunction = ({ column, feature, index, value })=> {
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

