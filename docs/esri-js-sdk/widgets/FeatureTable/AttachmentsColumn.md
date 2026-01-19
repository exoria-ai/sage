# AttachmentsColumn

**Module:** `@arcgis/core/widgets/FeatureTable/AttachmentsColumn`

## Import

```javascript
import AttachmentsColumn from "@arcgis/core/widgets/FeatureTable/AttachmentsColumn.js";
```

```javascript
// CDN
const AttachmentsColumn = await $arcgis.import("@arcgis/core/widgets/FeatureTable/AttachmentsColumn.js");
```

**Since:** 4.30

## See Also

- FeatureTable
- FeatureTableViewModel
- ArcGIS HTML Sanitizer
- ArcGIS Online supported HTML specification
- Calcite Icon Search

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `effectiveLabel`

### `icon`

### `layer`

### `sortable`

### `textAlign`

### `thumbnailAppearance`

### `thumbnailCount`

### `thumbnailIconScale`

### `thumbnailsEnabled`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


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

