# RelationshipColumn

**Module:** `@arcgis/core/widgets/FeatureTable/RelationshipColumn`

## Import

```javascript
import RelationshipColumn from "@arcgis/core/widgets/FeatureTable/RelationshipColumn.js";
```

```javascript
// CDN
const RelationshipColumn = await $arcgis.import("@arcgis/core/widgets/FeatureTable/RelationshipColumn.js");
```

**Since:** 4.30

## See Also

- Column
- FeatureTable
- FeatureTableViewModel
- ArcGIS HTML Sanitizer
- ArcGIS Online supported HTML specification
- Calcite Icon Search
- Relationship.id

## Property Details

### `collapsed`

### `declaredClass`
- **Type:** `Inherited`

### `effectiveLabel`

### `icon`

### `layer`

### `originRelationship`

### `relatedLayer`

### `relationship`

### `relationshipId`

### `resizable`

### `textAlign`

### `width`

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

