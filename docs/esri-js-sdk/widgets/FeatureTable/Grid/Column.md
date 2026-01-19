# Column

**Module:** `@arcgis/core/widgets/FeatureTable/Grid/Column`

## Import

```javascript
import Column from "@arcgis/core/widgets/FeatureTable/Grid/Column.js";
```

```javascript
// CDN
const Column = await $arcgis.import("@arcgis/core/widgets/FeatureTable/Grid/Column.js");
```

**Since:** 4.30

## See Also

- FeatureTable
- FeatureTableViewModel
- ColumnTemplate
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

### `autoWidth`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `direction`

### `effectiveDescription`

### `effectiveLabel`

### `fieldName`

### `flexGrow`

### `formatFunction`

### `frozen`

### `frozenToEnd`

### `hidden`

### `icon`

### `iconText`

### `initialSortPriority`

### `invalid`

### `label`

### `labelTooltipText`

### `menu`

### `menuConfig`

### `menuIsOpen`

### `menuIsVisible`

### `resizable`

### `sortable`

### `tableTimeZone`

### `textAlign`

### `textWrap`

### `timeZone`

### `visibleElements`

### `width`

### `addHandles`
- **Type:** `Inherited`

### `closeMenu`

### `hasHandles`
- **Type:** `Inherited`

### `openMenu`

### `removeHandles`
- **Type:** `Inherited`

### `sort`

### `ColumnTableMenuConfig`

### `FormatFunction`

### `RelatedRecordInfo`


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

