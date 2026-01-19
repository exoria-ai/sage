# ActionColumn

**Module:** `@arcgis/core/widgets/FeatureTable/ActionColumn`

## Import

```javascript
import ActionColumn from "@arcgis/core/widgets/FeatureTable/ActionColumn.js";
```

```javascript
// CDN
const ActionColumn = await $arcgis.import("@arcgis/core/widgets/FeatureTable/ActionColumn.js");
```

**Since:** 4.30

## See Also

- FeatureTable
- FeatureTableViewModel
- Sample - FeatureTable with custom content
- Sample - FeatureTable with related records
- Sample - FeatureTable with row highlights
- Calcite Icon Search

## Property Details

### `ActionColumn`

### `callback`

### `declaredClass`
- **Type:** `Inherited`

### `disabled`

### `icon`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `ActionColumnCallback`

### `ActionColumnDisabledFunction`


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

