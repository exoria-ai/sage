# Relationship

**Module:** `@arcgis/core/layers/support/Relationship`

## Import

```javascript
import Relationship from "@arcgis/core/layers/support/Relationship.js";
```

```javascript
// CDN
const Relationship = await $arcgis.import("@arcgis/core/layers/support/Relationship.js");
```

**Since:** 4.7

## See Also

- FeatureLayer
- ArcGIS REST API - Layer (Feature Service)

## Property Details

### `Relationship`

### `cardinality`

### `catalogId`

### `composite`

### `declaredClass`
- **Type:** `Inherited`

### `id`

### `keyField`

### `keyFieldInRelationshipTable`

### `name`

### `relatedTableId`

### `relationshipTableId`

### `role`

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

