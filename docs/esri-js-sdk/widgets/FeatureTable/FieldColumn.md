# FieldColumn

**Module:** `@arcgis/core/widgets/FeatureTable/FieldColumn`

## Import

```javascript
import FieldColumn from "@arcgis/core/widgets/FeatureTable/FieldColumn.js";
```

```javascript
// CDN
const FieldColumn = await $arcgis.import("@arcgis/core/widgets/FeatureTable/FieldColumn.js");
```

**Since:** 4.16

## See Also

- FeatureTable
- FeatureTableViewModel
- FieldColumnTemplate
- Field
- FeatureTable.multiSortEnabled
- initialSortPriority
- FieldColumnTemplate.editable
- ColumnTemplateBase.description
- Field.description
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

### `FieldColumn`

### `alias`

### `autoWidth`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `defaultValue`

### `description`
- **Type:** `Inherited`

### `direction`
- **Type:** `Inherited`

### `editable`

### `effectiveDescription`

### `effectiveLabel`
- **Type:** `Inherited`

### `field`

### `fieldName`
- **Type:** `Inherited`

### `flexGrow`
- **Type:** `Inherited`

### `formatFunction`

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

### `layer`

### `maxLength`

### `menu`
- **Type:** `Inherited`

### `menuConfig`
- **Type:** `Inherited`

### `menuIsOpen`
- **Type:** `Inherited`

### `menuIsVisible`
- **Type:** `Inherited`

### `minLength`

### `name`

### `nullable`

### `required`

### `resizable`
- **Type:** `Inherited`

### `sortable`

### `tableTimeZone`
- **Type:** `Inherited`

### `template`

### `textAlign`
- **Type:** `Inherited`

### `textWrap`
- **Type:** `Inherited`

### `timeZone`
- **Type:** `Inherited`

### `view`

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

### `FieldValueFormatFunction`


## Method Details

### `Method Details()`


## Examples

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

